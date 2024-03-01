import { IncomingHttpHeaders } from 'http';

export interface IGithubApiCallResponse<T> {
  statusCode?: number;
  headers: IncomingHttpHeaders;
  body: T;
}
