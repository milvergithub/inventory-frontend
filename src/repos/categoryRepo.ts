import { ApiPath } from "@/enums/apiPath.ts";
import type { Category } from "@/interfaces/models/category.ts";
import type { PaginationResponse } from "@/interfaces/paginationResponse.ts";
import { inventoryAPI } from "@/api/inventoryAPI.ts";
import type {CategorySearchRequest} from "@/interfaces/searchRequests/categorySearchRequest.ts";
import { isHttpSuccess } from "@/lib/query.ts";

export async function getCategoryAsync(id: number) {
	const path = `${ApiPath.Categories}/${id}`;
	const response = await inventoryAPI.get<Category>(path);
	return response.data;
}

export async function searchCategoriesAsync(params: CategorySearchRequest) {
	const response = await inventoryAPI.get<PaginationResponse<Category>>(ApiPath.Categories, { params });
	return response.data;
}

export async function deleteCategoryAsync(id: number) {
	const path = `${ApiPath.Categories}/${id}`;
	const response = await inventoryAPI.delete(path);
	return isHttpSuccess(response.status);
}
