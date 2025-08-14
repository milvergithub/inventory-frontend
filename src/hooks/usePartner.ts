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
import type { PartnerSearchRequest } from "@/interfaces/searchRequests/partnerSearchRequest";
import type { Partner } from "@/interfaces/models/partner";
import { retryQuery } from "@/lib/query";
import { deletePartnerAsync, getPartnerAsync, searchPartnersAsync } from "@/repos/partnerRepo";
import { useSearch } from "@/hooks/useSearch";

export function useSearchPartners(request?: PartnerSearchRequest) {
    const query = useInfiniteQuery<
        PaginationResponse<Partner>,
        AxiosError,
        Partner[],
        QueryKey,
        string | undefined
    >({
        queryKey: [ApiPath.Partners, request],
        queryFn: async () => await searchPartnersAsync(request!),
        getNextPageParam: (lastPage) => lastPage.hasMore,
        select: (data) => data.pages.flatMap((paginationResponse) => paginationResponse.data),
        enabled: !!request,
        retry: retryQuery,
        initialPageParam: undefined,
        placeholderData: keepPreviousData,
    });
    return useSearch(query);
}

export function useGetPartner(id?: number) {
    return useQuery<Partner, AxiosError>({
        queryKey: [ApiPath.Partners, id],
        queryFn: async () => await getPartnerAsync(id!),
        enabled: !!id,
        retry: retryQuery,
    });
}

export function useDeletePartner() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deletePartnerAsync(id),
        retry: retryQuery,
    });
}
