export class WebResponse<T> {
  data?: T;
  errors?: string;
  message?: string;
}

export class PaginationResponse {
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

export class PaginationQuery {
  take: number;
  skip: number;
}

export class DeletedDataRequest {
  id: number;
}
