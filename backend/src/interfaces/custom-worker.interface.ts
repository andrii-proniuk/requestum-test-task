export interface ICustomWorker {
  fetchUserRepositories: (url: string) => Promise<string[]>;
  terminate: () => void;
}
