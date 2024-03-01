import { IQueryParams } from './query-params.interface';

export interface IQueryParamsWithPagination extends IQueryParams {
  page?: string | number;
  per_page?: string | number;
}
