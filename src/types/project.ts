import { ID, Timestamp } from "./common";
import { Team } from "./team";

export type Project = {
    id: ID;
    title: string;
    description: string;
    thumbnailUrl: string;
    teams?: Team[];
    tags?: string[];
} & Timestamp;
