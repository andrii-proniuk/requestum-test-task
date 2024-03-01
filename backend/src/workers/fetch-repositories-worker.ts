import { parentPort } from 'worker_threads';
import { getUserContributions } from '../graphql/get-user-contributions';

parentPort.on('message', async (login: string) => {
  const result = await getUserContributions(login);

  parentPort.postMessage(result);
});
