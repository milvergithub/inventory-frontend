import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback } from "react";

export type Search<T> = UseInfiniteQueryResult<T[], AxiosError<unknown, any>>;
export type SearchResult<T> = {
	data?: T[];
	isFetching: boolean;
	canFetchNext: boolean;
	fetchNext: () => void;
};

export function useSearch<T>({
	isFetching,
	hasNextPage,
	fetchNextPage,
	data,
}: Search<T>): SearchResult<T> {
	const canFetchNext = !isFetching && hasNextPage;
	const fetchNext = useCallback(() => {
		if (canFetchNext) {
			fetchNextPage();
		}
	}, [canFetchNext]);

	return { data, isFetching, canFetchNext, fetchNext };
}
