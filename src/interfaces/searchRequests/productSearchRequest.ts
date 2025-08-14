import type {PaginationRequest} from "@/interfaces/paginationRequest.ts";
import {Sort} from "@/enums/sort.ts";

export interface ProductSearchRequest extends PaginationRequest {
    name?: string;
    code?: string;
    categoryId?: number;
    page?: number;
    pageSize?: number;
    sort?: { [key in SortBy]?: Sort };
}

type SortBy = "name" | "code";
