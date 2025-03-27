import { Tag } from "./tag";
import { User } from "./user";
import { Event } from "./event";

export interface Calendar {
    id: string;
    title: string;
    description?: string;
    owner: User;
    visitors: User[];
    events: Event[];
    tags: Tag[];
}