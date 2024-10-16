export interface PaginationRequest {
  page: number;
  limit: number;
}

export interface PaginationParams extends PaginationRequest {
  total: number;
  last_page: number;
}

export interface PaginationResponse {
  data: any[];
  pagination: PaginationParams;
}
