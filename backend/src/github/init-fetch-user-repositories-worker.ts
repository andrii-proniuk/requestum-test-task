import { Worker } from 'worker_threads';
import { ICustomWorker } from '../interfaces/custom-worker.interface';

type RejectFunction = (reason?: string) => void;

export const initFetchUserRepositoriesWorker = (): ICustomWorker => {
  const worker = new Worker('./dist/workers/fetch-repositories-worker.js');

  let globalReject: RejectFunction | undefined;

  worker.on('error', (error) => {
    console.log('worker error:', error);

    if (globalReject) {
      globalReject(error.message);
    } else {
      throw new Error(error.message);
    }
  });

  worker.on('exit', (exitCode) => {
    console.log('worker exited with code:', exitCode);

    if (!exitCode) {
      return;
    }

    const message = 'Worker exited with code: ' + exitCode;

    if (globalReject) {
      globalReject(message);
    } else {
      throw new Error(message);
    }
  });

  return {
    fetchUserRepositories: (url: string): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        globalReject = reject;

        worker.once('message', (response) => {
          resolve(response);
        });

        worker.postMessage(url);
      });
    },
    terminate: () => {
      worker.terminate();
    },
  };
};
