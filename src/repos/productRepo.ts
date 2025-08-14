import { ApiPath } from "@/enums/apiPath.ts";
import type { Product } from "@/interfaces/models/product.ts";
import type { PaginationResponse } from "@/interfaces/paginationResponse.ts";
import { inventoryAPI } from "@/api/inventoryAPI.ts";
import type { ProductSearchRequest } from "@/interfaces/searchRequests/productSearchRequest.ts";
import { isHttpSuccess } from "@/lib/query.ts";

export async function getProductAsync(id: number) {
    const path = `${ApiPath.Products}/${id}`;
    const response = await inventoryAPI.get<Product>(path);
    return response.data;
}

export async function searchProductsAsync(params: ProductSearchRequest) {
    const response = await inventoryAPI.get<PaginationResponse<Product>>(ApiPath.Products, { params });
    return response.data;
}

export async function deleteProductAsync(id: number) {
    const path = `${ApiPath.Products}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}
