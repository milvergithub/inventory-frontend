import { useQuery, useMutation, useInfiniteQuery, type QueryKey, keepPreviousData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { Supplier } from "@/interfaces/models/supplier";
import {getSupplierAsync, createSupplierAsync, deleteSupplierAsync, searchSuppliersAsync} from "@/repos/supplierRepo";
import type { PaginationResponse } from "@/interfaces/paginationResponse.ts";
import { ApiPath } from "@/enums/apiPath.ts";
import { retryQuery } from "@/lib/query.ts";
import { useSearch } from "@/hooks/useSearch.ts";
import type {SupplierSearchRequest} from "@/interfaces/searchRequests/supplierSearchRequest.ts";

export function useGetSupplier(id?: number) {
    return useQuery<Supplier, AxiosError>({
        queryKey: ["suppliers", id],
        queryFn: async () => await getSupplierAsync(id!),
        enabled: !!id,
    });
}

export function useSearchSuppliers(request?: SupplierSearchRequest) {

    const query = useInfiniteQuery<
        PaginationResponse<Supplier>,
        AxiosError,
        Supplier[],
        QueryKey,
        string | undefined
    >({
        queryKey: [ApiPath.Suppliers, request],
        queryFn: async () => await searchSuppliersAsync(request!),
        getNextPageParam: (lastPage) => lastPage.hasMore,
        select: (data) => data.pages.flatMap((paginationResponse) => paginationResponse.data),
        enabled: !!request,
        retry: retryQuery,
        initialPageParam: undefined,
        placeholderData: keepPreviousData,
    });
    return useSearch(query);
}

export function useCreateSupplier() {
    return useMutation<Supplier, AxiosError, Supplier>({
        mutationFn: async (data) => await createSupplierAsync(data),
    });
}

export function useDeleteSupplier() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deleteSupplierAsync(id),
    });
}
