import { Sort } from "@/enums/sort";
import type { PaginationRequest } from "@/interfaces/paginationRequest";

export interface SupplierSearchRequest extends PaginationRequest {
    sort?: { [key in SortBy]?: Sort };
}

type SortBy = "name" | "email" | "phone";
