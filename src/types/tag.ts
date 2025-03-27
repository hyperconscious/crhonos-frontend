import { Calendar } from "./calendar";
import { Event } from "./event";

export interface Tag {
    id: string;
    name: string;
    color: string;
    description?: string;
    events: Event[];
    calendar: Calendar;
}