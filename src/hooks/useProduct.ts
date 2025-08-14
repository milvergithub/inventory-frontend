import {
    keepPreviousData,
    type QueryKey,
    useInfiniteQuery,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { ApiPath } from "@/enums/apiPath";
import type { PaginationResponse } from "@/interfaces/paginationResponse";
import { AxiosError } from "axios";
import type { ProductSearchRequest } from "@/interfaces/searchRequests/productSearchRequest.ts";
import type { Product } from "@/interfaces/models/product.ts";
import { retryQuery } from "@/lib/query.ts";
import { deleteProductAsync, getProductAsync, searchProductsAsync } from "@/repos/productRepo.ts";
import { useSearch } from "@/hooks/useSearch.ts";

export function useSearchProducts(request?: ProductSearchRequest) {

    const query = useInfiniteQuery<
        PaginationResponse<Product>,
        AxiosError,
        Product[],
        QueryKey,
        string | undefined
    >({
        queryKey: [ApiPath.Products, request],
        queryFn: async () => await searchProductsAsync(request!),
        getNextPageParam: (lastPage) => lastPage.hasMore,
        select: (data) => data.pages.flatMap((paginationResponse) => paginationResponse.data),
        enabled: !!request,
        retry: retryQuery,
        initialPageParam: undefined,
        placeholderData: keepPreviousData,
    });
    return useSearch(query);
}

export function useGetProduct(id?: number) {
    return useQuery<Product, AxiosError>({
        queryKey: [ApiPath.Products, id],
        queryFn: async () => await getProductAsync(id!),
        enabled: !!id,
        retry: retryQuery,
    });
}

export function useDeleteProduct() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deleteProductAsync(id),
        retry: retryQuery,
    });
}
