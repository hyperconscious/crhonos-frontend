import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarOptions, DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { Dayjs } from 'dayjs';
import { Calendar as CalendarIcon, Trash2, Share2 } from 'lucide-react';
import EventModal from './EventModal';
import CalendarService from '../../services/CalendarService';
import { Event } from '../../types/event';
import { Calendar } from '../../types/calendar';
import { toast } from 'react-hot-toast';

interface MainCalendarProps {
    selectedDate: Dayjs;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ selectedDate }) => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [calendars, setCalendars] = useState<Calendar[]>([]);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const response = await CalendarService.getMyCalendars();
                const calendars = response.map((calendar) => ({
                    ...calendar.calendar,
                }));
                setCalendars(calendars);
                if (calendars.length > 0) {
                    setSelectedCalendar(calendars[0]);
                }
            } catch (error) {
                console.error('Failed to fetch user calendars', error);
                toast.error('Failed to fetch calendars');
            }
        };

        fetchCalendars();
    }, []);

    const fetchEvents = async () => {
        if (!selectedCalendar) return;
        try {
            const response = await CalendarService.getCalendarEvents(selectedCalendar.id, { page: 1, limit: 0 });
            setEvents(response.items);
        } catch (error) {
            console.error('Failed to fetch calendar events', error);
            toast.error('Failed to fetch events');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [selectedCalendar]);

    const handleSelect = (selectInfo: DateSelectArg) => {
        if (!selectedCalendar) {
            toast.error('Please select a calendar first');
            return;
        }
        setStartDate(selectInfo.startStr);
        setEndDate(selectInfo.endStr);
        setIsEventModalOpen(true);
    };

    const handleEventClick = async (clickInfo: { event: { id: string; title: string; remove: () => void } }) => {
        if (!selectedCalendar) return;

        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            // try {
            //     await CalendarService
            //     await fetchEvents(); // Refresh events after deletion
            //     toast.success('Event deleted successfully');
            // } catch (error) {
            //     console.error('Failed to delete event', error);
            //     toast.error('Failed to delete event');
            // }
        }
    };

    const handleEventSubmit = async (eventData: any) => {
        if (!selectedCalendar) return;
        try {
            await CalendarService.createEvent(selectedCalendar.id, eventData);
            await fetchEvents();
            setIsEventModalOpen(false);
            console.log(events)
            toast.success('Event created successfully');
        } catch (error) {
            console.error('Failed to create event', error);
            toast.error('Failed to create event');
        }
    };

    const handleDeleteCalendar = async () => {
        if (!selectedCalendar) return;

        if (window.confirm('Are you sure you want to delete this calendar?')) {
            try {
                await CalendarService.deleteCalendar(selectedCalendar.id);
                const remainingCalendars = calendars.filter(cal => cal.id !== selectedCalendar.id);
                setCalendars(remainingCalendars);
                setSelectedCalendar(remainingCalendars[0] || null);
                toast.success('Calendar deleted successfully');
            } catch (error) {
                console.error('Failed to delete calendar', error);
                toast.error('Failed to delete calendar');
            }
        }
    };

    const calendarEvents: EventSourceInput = events.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.startTime),
        end: event.endTime ? new Date(event.endTime) : undefined,
        allDay: false,
        backgroundColor: event.color || '#3B82F6',
        borderColor: 'transparent',
        textColor: '#ffffff',
        extendedProps: {
            description: event.description,
            type: event.type,
            recurrence: event.recurrence,
            color: event.color
        }
    }));

    const calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        initialDate: selectedDate.toDate(),
        height: '100%',
        contentHeight: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear',
        },
        titleFormat: { year: 'numeric' },
        eventDidMount: (info) => {
            const dot = document.createElement('span');
            dot.style.backgroundColor = info.event.backgroundColor || '#3B82F6';
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '50%';
            dot.style.display = 'inline-block';
            dot.style.marginRight = '5px';

            if (info.el.querySelector('.fc-event-title')) {
                info.el.querySelector('.fc-event-title')?.prepend(dot);
            }
        },
        views: {
            timeGridDay: {
                type: 'timeGrid',
                duration: { days: 1 },
            },
            timeGridWeek: {
                dayHeaderFormat: { weekday: 'long', day: 'numeric' },
            },
            multiMonthYear: {
                type: 'multiMonth',
                duration: { years: 1 },
                buttonText: 'Year',
                multiMonthMinWidth: 200,
                multiMonthMaxColumns: 3,
                titleFormat: { year: 'numeric' }
            },
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: handleSelect,
        eventClick: handleEventClick,
        events: calendarEvents,
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            hour12: false,
        },
        slotMinTime: '00:00:00',
        slotMaxTime: '24:00:00',
        nowIndicator: true,
    };

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(selectedDate.toDate());
        }
    }, [selectedDate]);

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <select
                            value={selectedCalendar?.id || ''}
                            onChange={async (e) => {
                                const calendar = await CalendarService.getCalendarById(e.target.value);
                                setSelectedCalendar(calendar);
                            }}
                            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 dark:text-white"
                        >
                            {calendars.map((calendar) => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.title}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                            <CalendarIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEventModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Event
                    </button>
                </div>
                {selectedCalendar && (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsShareModalOpen(true)}
                            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleDeleteCalendar}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                <FullCalendar
                    {...calendarOptions}
                    ref={calendarRef}
                />
            </div>

            {selectedCalendar && (
                <EventModal
                    calendarId={selectedCalendar.id}
                    isOpen={isEventModalOpen}
                    onClose={() => setIsEventModalOpen(false)}
                    onSubmit={handleEventSubmit}
                    startDate={startDate}
                    endDate={endDate}
                />
            )}
        </div>
    );
};

export default MainCalendar;