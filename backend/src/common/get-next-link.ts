import { IncomingHttpHeaders } from 'http';
import LinkHeader from 'http-link-header';

export const getNextLink = (
  headers: IncomingHttpHeaders,
): string | undefined => {
  if (!headers.link) {
    return;
  }

  const { refs } = LinkHeader.parse(headers.link as string);

  return refs.find((link) => link.rel === 'next')?.uri;
};
