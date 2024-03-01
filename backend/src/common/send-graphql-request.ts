import https from 'https';
import { IGraphQLResponse } from '../interfaces/graphql-response.interface';

export const sendGraphQLRequest = <T>(
  query: string,
): Promise<IGraphQLResponse<T>> => {
  const options: https.RequestOptions = {
    hostname: 'api.github.com',
    path: '/graphql',
    method: 'POST',

    headers: {
      'User-Agent': 'Mozilla/5.0',
      authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const data: any[] = [];

      if (res.statusCode !== 200) {
        console.log('status code:', res.statusCode);
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
          const body: IGraphQLResponse<T> = JSON.parse(
            Buffer.concat(data).toString(),
          );

          resolve(body);
        } catch (e: any) {
          console.log('Error in graphql request:', e);

          reject('Error in graphql request');
        }
      });
    });

    req.write(JSON.stringify({ query }));
    req.end();
  });
};
