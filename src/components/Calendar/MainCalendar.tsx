import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { Dayjs } from 'dayjs';

interface MainCalendarProps {
    selectedDate: Dayjs;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ selectedDate }) => {
    const calendarRef = useRef<FullCalendar>(null);

    const handleSelect = (selectInfo: DateSelectArg) => {
        const title = prompt('Enter event title:');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear the current selection

        if (title) {
            calendarApi.addEvent({
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    };

    const handleEventClick = (clickInfo: { event: { remove: () => void; title: string } }) => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
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
      <div className="w-full p-8">
          <FullCalendar
            {...calendarOptions}
            ref={calendarRef}
          />
      </div>
    );
};

export default MainCalendar;