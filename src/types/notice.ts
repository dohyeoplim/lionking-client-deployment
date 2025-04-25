import { ID, Timestamp } from "./common";
import { User } from "./user";

export type Notice = {
    id: ID;
    title: string;
    content: string;
    author: User | string;
    pinned?: boolean;
} & Timestamp;
