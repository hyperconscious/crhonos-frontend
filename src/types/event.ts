import { Calendar } from "./calendar";
import { Tag } from "./tag";
import { User } from "./user";

export enum EventRecurrence {
    None = 'none',
    Daily = 'daily',
    Weekly = 'weekly',
    BiWeekly = 'biweekly',
    Monthly = 'monthly',
    Yearly = 'yearly'
}

export enum EventType {
    Arrangement = 'arrangement',
    Reminder = 'reminder',
    Task = 'task',
}

export interface Event {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime?: Date;
    type: EventType;
    recurrence: EventRecurrence;
    creator: User;
    tags: Tag[];
    calendar: Calendar;
    color: string;
}