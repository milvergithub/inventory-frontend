import { Sort } from "@/enums/sort";
import type { PaginationRequest } from "@/interfaces/paginationRequest";

export interface WarehouseSearchRequest extends PaginationRequest {
    sort?: { [key in SortBy]?: Sort };
}

type SortBy = "name" | "partnerId";
