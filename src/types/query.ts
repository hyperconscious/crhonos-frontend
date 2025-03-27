export interface QueryOptions {
    page: number;
    limit: number;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    search?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
}