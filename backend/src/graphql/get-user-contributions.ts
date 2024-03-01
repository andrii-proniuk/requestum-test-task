import { sendGraphQLRequest } from '../common/send-graphql-request';
import { IUserContributedRepositoriesResponse } from '../interfaces/user-contributed-repositories-response.interface';
import { graphQlQueriesComposer } from './graphql-queries-composer';

export const getUserContributions = async (user: string): Promise<string[]> => {
  const repositoriesMap = new Map<string, boolean>();

  let after: string | undefined;

  do {
    const query = graphQlQueriesComposer.getUserContributedRepositories(
      user,
      after,
    );

    const response =
      await sendGraphQLRequest<IUserContributedRepositoriesResponse>(query);

    response.data.user.repositoriesContributedTo.nodes.forEach((node) => {
      if (!node?.name || !node?.owner?.login) {
        return;
      }

      const repository = [node.owner.login, node.name].join('/');

      if (!repositoriesMap.has(repository)) {
        repositoriesMap.set(repository, true);
      }
    });

    if (!response.data.user.repositoriesContributedTo.pageInfo.hasNextPage) {
      break;
    }

    after = response.data.user.repositoriesContributedTo.pageInfo.endCursor;
  } while (true);

  return Array.from(repositoriesMap.keys());
};
