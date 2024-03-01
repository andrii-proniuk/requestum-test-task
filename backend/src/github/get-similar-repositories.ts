import { IResponseRepository } from '../interfaces/response-repository.interface';
import { getUsersRepositoriesWithCommonContributorsCount } from '../graphql/get-users-repositories-with-common-contributors-count';
import { fetchRepositoryContributorsLogins } from './fetch-repository-contributors';

const REPOSITORIES_COUNT = parseInt(process.env.REPOSITORIES_COUNT) || 5;

const composeResponseRepository = ([name, contributorsCount]: [
  string,
  number,
]): IResponseRepository => {
  return {
    name,
    url: `https://github.com/${name}`,
    contributorsCount,
  };
};

const getMostSimilarRepositoriesFromArray = (
  repositoriesMap: Map<string, number>,
): IResponseRepository[] => {
  const mostSimilarRepositories: IResponseRepository[] = [];

  const repositories = Array.from(repositoriesMap.entries()).map(
    composeResponseRepository,
  );

  const repositoriesCount = Math.min(REPOSITORIES_COUNT, repositories.length);

  for (let i = 0; i < repositoriesCount; i++) {
    let repoIndex = 0;

    for (let j = 1; j < repositories.length; j++) {
      if (
        repositories[repoIndex].contributorsCount <
        repositories[j].contributorsCount
      ) {
        repoIndex = j;
      }
    }

    mostSimilarRepositories.push(...repositories.splice(repoIndex, 1));
  }

  return mostSimilarRepositories;
};

export const getSimilarRepositories = async (repositoryIdentifier: string): Promise<any> => {
  const logins = await fetchRepositoryContributorsLogins(repositoryIdentifier);

  const repositoriesMap =
    await getUsersRepositoriesWithCommonContributorsCount(logins);

  repositoriesMap.delete(repositoryIdentifier);

  return getMostSimilarRepositoriesFromArray(repositoriesMap);
};
