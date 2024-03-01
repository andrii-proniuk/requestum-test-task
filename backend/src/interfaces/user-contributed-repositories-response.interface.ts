import { IPageInfo } from './page-info.interface';

interface IRepositoryOwner {
  login: string;
}

interface IRepositoryNode {
  owner: IRepositoryOwner;
  name: string;
}

interface IRepositoriesContributedTo {
  nodes: IRepositoryNode[];
  pageInfo: IPageInfo;
}

interface IUser {
  id: string;
  login: string;
  repositoriesContributedTo: IRepositoriesContributedTo;
}

export interface IUserContributedRepositoriesResponse {
  user: IUser;
}
