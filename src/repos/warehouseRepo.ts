import { ApiPath } from "@/enums/apiPath";
import type { Warehouse } from "@/interfaces/models/warehouse";
import { inventoryAPI } from "@/api/inventoryAPI";
import { isHttpSuccess } from "@/lib/query";
import type {WarehouseSearchRequest} from "@/interfaces/searchRequests/warehouseSearchRequest.ts";

export async function getWarehouseAsync(id: number) {
    const path = `${ApiPath.Warehouses}/${id}`;
    const response = await inventoryAPI.get<Warehouse>(path);
    return response.data;
}

export async function searchWarehousesAsync(params?: WarehouseSearchRequest) {
    const response = await inventoryAPI.get<Warehouse[]>(ApiPath.Warehouses, { params });
    return response.data;
}

export async function deleteWarehouseAsync(id: number) {
    const path = `${ApiPath.Warehouses}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}

export async function createWarehouseAsync(data: Warehouse) {
    const response = await inventoryAPI.post<Warehouse>(ApiPath.Warehouses, data);
    return response.data;
}
