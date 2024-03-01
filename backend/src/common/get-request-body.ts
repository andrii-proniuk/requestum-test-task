import http from 'http';

export const getRequestBody = <T>(
  request: http.IncomingMessage,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const data: any[] = [];

    request.on('data', (chunk) => {
      data.push(chunk);
    });

    request.on('end', () => {
      if (!data?.length) {
        reject('Empty request body');
      }

      try {
        resolve(JSON.parse(Buffer.concat(data).toString()));
      } catch (e: any) {
        console.log('Error while parsing request body:', e);

        reject('Error while parsing request body');
      }
    });
  });
};
