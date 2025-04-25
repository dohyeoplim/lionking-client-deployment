import { ID, Timestamp } from "./common";
import { User } from "./user";

export type Team = {
    id: ID;
    name: string;
    description: string;
    members: User[];
} & Timestamp;
