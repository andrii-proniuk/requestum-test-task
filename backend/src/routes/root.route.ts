import http from 'http';
import { getRequestBody } from '../common/get-request-body';
import { sendResponse } from '../common/send-response';
import { IGetSimilarRepositoriesDto } from '../dto/get-similar-repositories-dto.interface';
import { getRepositoryIdentifierFromUrl } from '../github/get-repository-identifier-from-url';
import { getSimilarRepositories } from '../github/get-similar-repositories';

export const rootRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  try {
    const body = await getRequestBody<IGetSimilarRepositoriesDto>(req);

    const url = body.url;

    if (!url) {
      return sendResponse(res, 400, { message: 'url property is required' });
    }

    const repositoryIdentifier = getRepositoryIdentifierFromUrl(url);

    if (!repositoryIdentifier) {
      return sendResponse(res, 400, { message: 'Invalid repository url' });
    }

    const similarRepositories = await getSimilarRepositories(repositoryIdentifier);

    sendResponse(res, 200, similarRepositories);
  } catch (e: any) {
    sendResponse(res, 400, { message: e.message });
  }
};
