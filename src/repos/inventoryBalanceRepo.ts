import { ApiPath } from "@/enums/apiPath";
import type { InventoryBalance } from "@/interfaces/models/inventoryBalance";
import { inventoryAPI } from "@/api/inventoryAPI";
import { isHttpSuccess } from "@/lib/query";
import type {PaginationResponse} from "@/interfaces/paginationResponse.ts";
import type {InventoryBalanceSearchRequest} from "@/interfaces/searchRequests/inventoryBalanceSearchRequest.ts";

export async function getInventoryBalanceAsync(id: number) {
    const path = `${ApiPath.InventoryBalances}/${id}`;
    const response = await inventoryAPI.get<InventoryBalance>(path);
    return response.data;
}

export async function searchInventoryBalancesAsync(params: InventoryBalanceSearchRequest) {
    const response = await inventoryAPI.get<PaginationResponse<InventoryBalance>>(ApiPath.InventoryBalances, { params });
    return response.data;
}

export async function createInventoryBalanceAsync(data: InventoryBalance) {
    const response = await inventoryAPI.post<InventoryBalance>(ApiPath.InventoryBalances, data);
    return response.data;
}

export async function deleteInventoryBalanceAsync(id: number) {
    const path = `${ApiPath.InventoryBalances}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}
