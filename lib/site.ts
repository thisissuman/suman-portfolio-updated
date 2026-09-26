export function getSiteUrl(value = process.env.SITE_URL): URL | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'SITE_URL must be an HTTPS origin without credentials, path, query or fragment.',
    );
  }
  return url;
}
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
