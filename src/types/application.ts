import { Timestamp, ID } from "./common";
import { User } from "./user";

export type ApplicationStatus = "draft" | "submitted" | "interviewing" | "accepted" | "rejected";

export type ApplicationQuestion = {
    id: ID;
    question: string;
    answer?: string;
} & Timestamp;

export type ApplicationReviewComment = {
    id: ID;
    applicationId: ID;
    reviewer: User;
    comment: string;
} & Timestamp;

export type Application = {
    id: ID;
    user: User;
    status: ApplicationStatus;
    questions: ApplicationQuestion[];
    reviewComments: ApplicationReviewComment[];
} & Timestamp;
