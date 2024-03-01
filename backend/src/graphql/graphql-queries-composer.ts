const composeAfterProperty = (after?: string): string => {
  return after ? `, after:"${after}"` : '';
};

export const graphQlQueriesComposer = {
  getUserContributedRepositories: (login: string, after?: string) => {
    return `query {
      user(login: "${login}") {
        id
        login
        repositoriesContributedTo(first:100${composeAfterProperty(after)}) {
          nodes {
            owner {
              login
            }
            name
          }
          pageInfo{
            hasNextPage
            endCursor
          }
        }
      }
    }`;
  },
};
