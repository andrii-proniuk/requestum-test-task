import https from 'https';
import { IGithubApiCallResponse } from '../interfaces/github-api-call-response.interface';
import { IQueryParams } from '../interfaces/query-params.interface';
import { IQueryParamsWithPagination } from '../interfaces/query-params-with-pagination.interface';

const composeQueryParameters = (query?: IQueryParams) => {
  if (!query) {
    return '';
  }

  const keys = Object.keys(query) as (keyof IQueryParams)[];

  if (!keys.length) {
    return '';
  }

  return '?' + keys.map((key) => `${key}=${query[key]}`).join('&');
};

const composeRequestOptions = (
  url: string,
  query?: IQueryParamsWithPagination,
): https.RequestOptions => {
  const { hostname, pathname, searchParams } = new URL(url);

  const queryParams = composeQueryParameters({
    ...Object.fromEntries(searchParams),
    ...query,
  });

  return {
    hostname,
    path: pathname + queryParams,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  };
};

export const sendRequestToGithub = <T>(
  url: string,
  query?: IQueryParamsWithPagination,
): Promise<IGithubApiCallResponse<T>> => {
  const options = composeRequestOptions(url, query);

  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      const data: any[] = [];

      if (res.statusCode !== 200) {
        reject('Invalid response');
      }

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        if (!data?.length) {
          reject('Invalid response');
        }

        try {
          const body: T = JSON.parse(Buffer.concat(data).toString());

          const result: IGithubApiCallResponse<T> = {
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          };

          resolve(result);
        } catch (e: any) {
          console.log('Error in get request:', e);

          reject(e?.message || 'Error while parsing response');
        }
      });
    });
  });
};
