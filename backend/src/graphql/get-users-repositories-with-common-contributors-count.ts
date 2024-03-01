import { initFetchUserRepositoriesWorker } from '../github/init-fetch-user-repositories-worker';
import { ICustomWorker } from '../interfaces/custom-worker.interface';

export const getUsersRepositoriesWithCommonContributorsCount = async (
  logins: string[],
): Promise<Map<string, number>> => {
  const workersCount = parseInt(process.env.WORKERS_COUNT) || 6;

  const workers = Array.from({ length: workersCount }).map(
    initFetchUserRepositoriesWorker,
  );

  const repositoriesMap = new Map<string, number>();

  const processRepositories = (repositories: string[]): void => {
    repositories.forEach((repository) => {
      if (!repositoriesMap.has(repository)) {
        return repositoriesMap.set(repository, 1);
      }

      repositoriesMap.set(repository, repositoriesMap.get(repository) + 1);
    });
  };

  const runWorker = async (worker: ICustomWorker): Promise<void> => {
    const login = logins.shift();

    if (!login) {
      return worker.terminate();
    }

    const repositories = await worker.fetchUserRepositories(login);

    processRepositories(repositories);

    console.log(`${logins.length} users left`);

    return runWorker(worker);
  };

  await Promise.all(workers.map(runWorker));

  return repositoriesMap;
};
