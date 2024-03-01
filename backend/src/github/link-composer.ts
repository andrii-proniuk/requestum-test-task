const GITHUB_API_URL = 'https://api.github.com';

export const githubApiUrlComposer = {
  getRepositoryContributors: (repository: string) => {
    return `${GITHUB_API_URL}/repos/${repository}/contributors`;
  },
};
