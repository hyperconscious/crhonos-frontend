import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { Dayjs } from 'dayjs';
import EventModal from './EventModal';
import { Calendar as CalendarIcon, Clock, Share2, Star, Trash2, Users } from 'lucide-react';
import CalendarService from '../../services/CalendarService';
import { Event } from '../../types/event';
import { Calendar } from '../../types/calendar';

interface MainCalendarProps {
    selectedDate: Dayjs;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ selectedDate }) => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [calendars, setCalendars] = useState<Calendar[]>([]);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState<Calendar>(calendars[0] || '');

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
            }
        };

        fetchCalendars();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!selectedCalendar) return;
            try {
                const response = await CalendarService.getCalendarEvents(selectedCalendar?.id);
                setEvents(response.items);
            } catch (error) {
                console.error('Failed to fetch calendar events', error);
            }
        };

        fetchEvents();
    }, [selectedCalendar]);


    const handleSelect = () => {
        if (!selectedCalendar) {
            alert('Please select a calendar first');
            return;
        }
        setIsEventModalOpen(true);
    };

    const handleEventClick = (clickInfo: { event: { remove: () => void; title: string } }) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    };

    const handleEventSubmit = async (eventData: any) => {
        await CalendarService.createEvent(selectedCalendar.id, eventData);
    };

    const handleDeleteCalendar = async () => {
        if (window.confirm('Are you sure you want to delete this calendar?')) {
            await CalendarService.deleteCalendar(selectedCalendar.id);
            setSelectedCalendar(calendars[0] || '');
        }
    };

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
            },
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: handleSelect,
        eventClick: handleEventClick,
        events: events.map((event) => ({
            ...event,
            start: event.startTime,
            end: event.endTime,
        })),
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
                            value={selectedCalendar.id}
                            onChange={async (e) => setSelectedCalendar(await CalendarService.getCalendarById(e.target.value).then(calendar => calendar))}
                            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 dark:text-white"
                        >
                            {/* <option value="">Select Calendar</option> */}
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

            <EventModal
                calendarId={selectedCalendar.id}
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                onSubmit={handleEventSubmit}
            />

            {/* <ShareCalendarModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                calendarId={selectedCalendar}
            /> */}
        </div>
    );
};

export default MainCalendar;