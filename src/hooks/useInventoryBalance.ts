import {useQuery, useMutation, useInfiniteQuery, type QueryKey, keepPreviousData} from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { InventoryBalance } from "@/interfaces/models/inventoryBalance";
import { getInventoryBalanceAsync, searchInventoryBalancesAsync, createInventoryBalanceAsync, deleteInventoryBalanceAsync } from "@/repos/inventoryBalanceRepo";
import type {InventoryBalanceSearchRequest} from "@/interfaces/searchRequests/inventoryBalanceSearchRequest.ts";
import type {PaginationResponse} from "@/interfaces/paginationResponse.ts";
import {ApiPath} from "@/enums/apiPath.ts";
import {retryQuery} from "@/lib/query.ts";
import {useSearch} from "@/hooks/useSearch.ts";

export function useGetInventoryBalance(id?: number) {
    return useQuery<InventoryBalance, AxiosError>({
        queryKey: ["inventoryBalances", id],
        queryFn: async () => await getInventoryBalanceAsync(id!),
        enabled: !!id,
    });
}

export function useSearchInventoryBalances(request?: InventoryBalanceSearchRequest) {

    const query = useInfiniteQuery<
        PaginationResponse<InventoryBalance>,
        AxiosError,
        InventoryBalance[],
        QueryKey,
        string | undefined
    >({
        queryKey: [ApiPath.InventoryBalances, request],
        queryFn: async () => await searchInventoryBalancesAsync(request!),
        getNextPageParam: (lastPage) => lastPage.hasMore,
        select: (data) => data.pages.flatMap((paginationResponse) => paginationResponse.data),
        enabled: !!request,
        retry: retryQuery,
        initialPageParam: undefined,
        placeholderData: keepPreviousData,
    });
    return useSearch(query);
}

export function useCreateInventoryBalance() {
    return useMutation<InventoryBalance, AxiosError, InventoryBalance>({
        mutationFn: async (data) => await createInventoryBalanceAsync(data),
    });
}

export function useDeleteInventoryBalance() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deleteInventoryBalanceAsync(id),
    });
}
