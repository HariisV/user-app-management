export declare class WebResponse<T> {
    data?: T;
    errors?: string;
    message?: string;
}
export declare class PaginationResponse {
    data: {
        list: any[];
        pagination: {
            total: number;
            skip: number;
            take: number;
            currentTotal: number;
        };
    };
    msg: string;
}
export declare class PaginationQuery {
    take: number;
    skip: number;
}
export declare class DeletedDataRequest {
    id: number;
}
