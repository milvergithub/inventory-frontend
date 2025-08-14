import type { User } from "@/interfaces/models/user.ts";

export interface Partner {
    id: number;
    userId: number;
    description?: string;
    user: User;
    createdAt: string;
    createdBy: number | null;
    updatedAt: string;
    updatedBy: number | null;
}
