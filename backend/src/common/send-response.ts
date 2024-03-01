import http from 'http';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000,
  'Content-type': 'application/json',
};

export const sendResponse = (
  res: http.ServerResponse,
  statusCode: number,
  body?: object,
) => {
  res.writeHead(statusCode, headers);

  res.end(body ? JSON.stringify(body) : undefined);
};
