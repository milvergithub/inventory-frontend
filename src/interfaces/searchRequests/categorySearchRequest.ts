import { Sort } from "@/enums/sort";
import type { PaginationRequest } from "@/interfaces/paginationRequest.ts";

export interface CategorySearchRequest extends PaginationRequest {
    sort?: { [key in SortBy]?: Sort };
}

type SortBy = "name" | "id";
