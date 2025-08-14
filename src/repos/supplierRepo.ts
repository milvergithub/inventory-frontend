import { ApiPath } from "@/enums/apiPath";
import type { Supplier } from "@/interfaces/models/supplier";
import { inventoryAPI } from "@/api/inventoryAPI";
import { isHttpSuccess } from "@/lib/query";
import type {SupplierSearchRequest} from "@/interfaces/searchRequests/supplierSearchRequest.ts";
import type {PaginationResponse} from "@/interfaces/paginationResponse.ts";
import type {Product} from "@/interfaces/models/product.ts";

export async function getSupplierAsync(id: number) {
    const path = `${ApiPath.Suppliers}/${id}`;
    const response = await inventoryAPI.get<Supplier>(path);
    return response.data;
}

export async function searchSuppliersAsync(params: SupplierSearchRequest) {
    const response = await inventoryAPI.get<PaginationResponse<Product>>(ApiPath.Suppliers, { params });
    return response.data;
}

export async function deleteSupplierAsync(id: number) {
    const path = `${ApiPath.Suppliers}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}

export async function createSupplierAsync(data: Supplier) {
    const response = await inventoryAPI.post<Supplier>(ApiPath.Suppliers, data);
    return response.data;
}
