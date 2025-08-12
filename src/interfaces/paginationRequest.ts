import { Sort } from "@/enums/sort";

export interface PaginationRequest {
	limit?: number;
	sort?: { [key: string]: Sort };
}
