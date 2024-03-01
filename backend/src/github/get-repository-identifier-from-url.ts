export const getRepositoryIdentifierFromUrl = (
  repoUrl: string,
): string | undefined => {
  const regexp = new RegExp('github.com/(.*)', 'g');

  const foundParts = regexp.exec(repoUrl);

  if (!foundParts?.[1]) {
    return;
  }

  return foundParts[1].split('/').slice(0, 2).join('/');
};
