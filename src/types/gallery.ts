import { Timestamp } from "./common";
import { User } from "./user";

export type GalleryPhoto = {
    id: string;
    imageUrl: string;
    description?: string;
    uploader: User | string;
} & Timestamp;
