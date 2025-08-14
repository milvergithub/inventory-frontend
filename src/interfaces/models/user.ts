export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    createdBy: number | null;
    updatedAt: string;
    updatedBy: number | null;
}
