import type { Sort } from "@/enums/sort";

export interface PartnerSearchRequest {
    name?: string;
    limit?: number;
    offset?: number;
    sort?: {
        name?: Sort;
    };
}
