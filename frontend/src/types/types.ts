export interface Notification {
    id: number;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number; // Duration in milliseconds
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}
