import { ID, Timestamp } from "./common";

export type UserRole = "lion" | "babylion" | "guest";
export type UserStatus = "active" | "pending" | "rejected" | "withdrawn";

export type User = {
    id: ID;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    lionGeneration?: string;
    lionDepartment?: string;
    studentId?: string;
    profileImageUrl?: string;
    status?: UserStatus;
    introduction?: string;
    githubUrl?: string;
    otherUrl?: string;
    blogUrl?: string;
} & Timestamp;
