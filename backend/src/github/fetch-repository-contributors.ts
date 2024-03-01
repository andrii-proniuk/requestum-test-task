import { sendRequestToGithub } from '../common/send-get-request';
import { IUser } from '../interfaces/user.interface';
import { getNextLink } from '../common/get-next-link';
import { githubApiUrlComposer } from './link-composer';

export const fetchRepositoryContributorsLogins = async (
  repository: string,
): Promise<string[]> => {
  const startUrl = githubApiUrlComposer.getRepositoryContributors(repository);

  const fetchedEntities: IUser[] = [];

  let url = startUrl;

  try {
    while (!!url) {
      const response = await sendRequestToGithub<IUser[]>(url, {
        per_page: 100,
      });

      fetchedEntities.push(...response.body);

      url = getNextLink(response.headers);
    }
  } catch (e: any) {
    console.log('Error in fetchRepositoryContributorsLogins:', e);

    throw e;
  }

  return fetchedEntities
    .filter((user) => user.type !== 'Bot')
    .map((user) => user.login);
};
