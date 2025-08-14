import { ApiPath } from "@/enums/apiPath";
import type { Partner } from "@/interfaces/models/partner";
import type { PaginationResponse } from "@/interfaces/paginationResponse";
import { inventoryAPI } from "@/api/inventoryAPI";
import { isHttpSuccess } from "@/lib/query";
import type { PartnerSearchRequest } from "@/interfaces/searchRequests/partnerSearchRequest";

export async function getPartnerAsync(id: number) {
    const path = `${ApiPath.Partners}/${id}`;
    const response = await inventoryAPI.get<Partner>(path);
    return response.data;
}

export async function searchPartnersAsync(params: PartnerSearchRequest) {
    const response = await inventoryAPI.get<PaginationResponse<Partner>>(ApiPath.Partners, { params });
    return response.data;
}

export async function deletePartnerAsync(id: number) {
    const path = `${ApiPath.Partners}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}
