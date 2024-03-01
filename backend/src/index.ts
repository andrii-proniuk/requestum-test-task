import http from 'http';
import dotenv from 'dotenv';
import { sendResponse } from './common/send-response';
import { rootRoute } from './routes/root.route';

dotenv.config();

const requestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  if (req.method !== 'POST' || req.url !== '/') {
    return sendResponse(res, 404, { message: 'api route not found' });
  }

  return rootRoute(req, res);
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT);
});
