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
import type { CategorySearchRequest } from "@/interfaces/searchRequests/categorySearchRequest.ts";
import type { Category } from "@/interfaces/models/category.ts";
import { retryQuery } from "@/lib/query.ts";
import { deleteCategoryAsync, getCategoryAsync, searchCategoriesAsync } from "@/repos/categoryRepo.ts";
import { useSearch } from "@/hooks/useSearch.ts";

export function useSearchCategories(request?: CategorySearchRequest) {

	const query = useInfiniteQuery<
		PaginationResponse<Category>,
		AxiosError,
		Category[],
		QueryKey,
		string | undefined
	>({
		queryKey: [ApiPath.Categories, request],
		queryFn: async () => await searchCategoriesAsync(request!),
		getNextPageParam: (lastPage) => lastPage.hasMore,
		select: (data) => data.pages.flatMap((paginationResponse) => paginationResponse.data),
		enabled: !!request,
		retry: retryQuery,
		initialPageParam: undefined,
		placeholderData: keepPreviousData,
	});
	return useSearch(query);
}

export function useGetCategory(id?: number) {
	return useQuery<Category, AxiosError>({
		queryKey: [ApiPath.Categories, id],
		queryFn: async () => await getCategoryAsync(id!),
		enabled: !!id,
		retry: retryQuery,
	});
}

export function useDeleteCategory() {
	return useMutation<boolean, AxiosError, number>({
		mutationFn: async (id) => await deleteCategoryAsync(id),
		retry: retryQuery,
	});
}
