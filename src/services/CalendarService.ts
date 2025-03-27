import axios from '../api/axios';
import { toast } from 'react-hot-toast';
import { Calendar } from '../types/calendar';
import { User } from '../types/user';
import { Event } from '../types/event';
import { UserInCalendar } from '../types/UserInCalendar';
import { PaginatedResponse, QueryOptions } from '../types/query';



class CalendarService {
    private static async handleRequest<T>(
        request: Promise<{ data: T }>,
        errorMessage: string
    ): Promise<T> {
        try {
            const response = await request;
            return response.data;
        } catch (error) {
            toast.error(errorMessage);
            throw error;
        }
    }

    static async getMyCalendars(): Promise<UserInCalendar[]> {
        return this.handleRequest(
            axios.get(`/api/calendar/my-calendars`),
            'Failed to fetch calendars'
        );
    }

    static async getSharedCalendars(): Promise<Calendar[]> {
        return this.handleRequest(
            axios.get(`/api/calendar/shared-calendars`),
            'Failed to fetch shared calendars'
        );
    }

    static async getCalendarById(id: string): Promise<Calendar> {
        return this.handleRequest(
            axios.get(`/api/calendar/${id}`),
            'Failed to fetch calendar'
        );
    }

    static async getCalendarEvents(id: string, options: QueryOptions,): Promise<PaginatedResponse<Event>> {
        return this.handleRequest(
            axios.get(`/api/calendar/${id}/events`, { params: options }),
            'Failed to fetch events'
        );
    }

    static async createEvent(
        calendarId: string,
        event: Partial<Event>
    ): Promise<Event> {
        return this.handleRequest(
            axios.post(`/api/calendar/${calendarId}/event`, event),
            'Failed to create event'
        );
    }

    static async shareCalendar(
        calendarId: string,
        userId: string,
        role: 'viewer' | 'editor'
    ): Promise<void> {
        return this.handleRequest(
            axios.post(`/api/calendar/${calendarId}/share`, { userId, role }),
            'Failed to share calendar'
        );
    }

    static async updateCalendar(
        id: string,
        data: Partial<Calendar>
    ): Promise<Calendar> {
        return this.handleRequest(
            axios.patch(`/api/calendar/${id}`, data),
            'Failed to update calendar'
        );
    }

    static async deleteCalendar(id: string): Promise<void> {
        return this.handleRequest(
            axios.delete(`/api/calendar/${id}`),
            'Failed to delete calendar'
        );
    }

    static async addVisitor(
        calendarId: string,
        visitorData: Partial<User>
    ): Promise<void> {
        return this.handleRequest(
            axios.post(`/api/calendar/${calendarId}/visitor`, visitorData),
            'Failed to add visitor'
        );
    }

    static async removeVisitor(
        calendarId: string,
        visitorId: string
    ): Promise<void> {
        return this.handleRequest(
            axios.delete(`/api/calendar/${calendarId}/visitor`, {
                data: { visitorId },
            }),
            'Failed to remove visitor'
        );
    }
}

export default CalendarService;