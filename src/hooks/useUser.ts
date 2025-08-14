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
import type { UserSearchRequest } from "@/interfaces/searchRequests/userSearchRequest";
import type { User } from "@/interfaces/models/user";
import { retryQuery } from "@/lib/query";
import { deleteUserAsync, getUserAsync, searchUsersAsync } from "@/repos/userRepo";
import { useSearch } from "@/hooks/useSearch";

export function useSearchUsers(request?: UserSearchRequest) {
    const query = useInfiniteQuery<
        PaginationResponse<User>,
        AxiosError,
        User[],
        QueryKey,
        string | undefined
    >({
        queryKey: [ApiPath.Users, request],
        queryFn: async () => await searchUsersAsync(request!),
        getNextPageParam: (lastPage) => lastPage.hasMore,
        select: (data) => data.pages.flatMap((page) => page.data),
        enabled: !!request,
        retry: retryQuery,
        initialPageParam: undefined,
        placeholderData: keepPreviousData,
    });

    return useSearch(query);
}

export function useGetUser(id?: number) {
    return useQuery<User, AxiosError>({
        queryKey: [ApiPath.Users, id],
        queryFn: async () => await getUserAsync(id!),
        enabled: !!id,
        retry: retryQuery,
    });
}

export function useDeleteUser() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deleteUserAsync(id),
        retry: retryQuery,
    });
}
