export class PaginateResponse<T> {
  count: number;
  filteredCount: number;
  data: T[];
}
