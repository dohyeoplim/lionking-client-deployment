import { ID, Timestamp } from "./common";
import { User } from "./user";

export type Blog = {
    id: ID;
    slug: string;
    title: string;
    content: string;
    author: User | string;
    previewImageUrl?: string;
    tags?: string[];
} & Timestamp;
