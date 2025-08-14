import type { Sort } from "@/enums/sort";

export interface UserSearchRequest {
    sort?: {
        username?: Sort;
        email?: Sort;
        createdAt?: Sort;
    };
    limit?: number;
    offset?: number;
    search?: string;
}
