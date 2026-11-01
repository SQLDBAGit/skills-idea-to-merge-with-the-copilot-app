const slugPattern = /^mona-[0-9A-Za-z]{4}$/;

export function normalizeUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError('A URL is required.');
  }

  const trimmed = value.trim();
  const candidate = trimmed.startsWith('//')
    ? `https:${trimmed}`
    : /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
  const url = new URL(candidate);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new TypeError('Only http and https URLs are supported.');
  }

  return url.href;
}

export function loadBookmarks(serialized) {
  if (typeof serialized !== 'string' || serialized.trim() === '') return [];

  try {
    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      if (
        item === null ||
        typeof item !== 'object' ||
        typeof item.url !== 'string' ||
        typeof item.slug !== 'string' ||
        !slugPattern.test(item.slug)
      ) {
        return [];
      }

      try {
        const url = normalizeUrl(item.url);
        if (url !== item.url) return [];
        return [{ url, slug: item.slug }];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}

export function formatBookmark(bookmark) {
  return `${bookmark.url} :: ${bookmark.slug}`;
}
