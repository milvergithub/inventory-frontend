export interface PaginationResponse<T> {
    hasMore: string | null;
    data: T[];
}
