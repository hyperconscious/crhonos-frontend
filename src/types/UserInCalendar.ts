import { Calendar } from "./calendar";
import { User } from "./user";

export enum UserRole {
    visitor = 'visitor', // can see events
    editor = 'editor', // ..can edit events
    admin = 'admin', // ..can edit calendar and add/remove users
    owner = 'owner', // can edit calendar and add/remove admins
}

export interface UserInCalendar {
    id: string;
    calendar: Calendar;
    user: User;
    role: UserRole;
}