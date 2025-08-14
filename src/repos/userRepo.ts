import { ApiPath } from "@/enums/apiPath";
import type { User } from "@/interfaces/models/user";
import type { PaginationResponse } from "@/interfaces/paginationResponse";
import { inventoryAPI } from "@/api/inventoryAPI";
import type { UserSearchRequest } from "@/interfaces/searchRequests/userSearchRequest";
import { isHttpSuccess } from "@/lib/query";

export async function getUserAsync(id: number) {
    const path = `${ApiPath.Users}/${id}`;
    const response = await inventoryAPI.get<User>(path);
    return response.data;
}

export async function searchUsersAsync(params: UserSearchRequest) {
    const response = await inventoryAPI.get<PaginationResponse<User>>(ApiPath.Users, { params });
    return response.data;
}

export async function deleteUserAsync(id: number) {
    const path = `${ApiPath.Users}/${id}`;
    const response = await inventoryAPI.delete(path);
    return isHttpSuccess(response.status);
}
