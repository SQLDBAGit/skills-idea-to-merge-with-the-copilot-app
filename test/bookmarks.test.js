import assert from 'node:assert/strict';
import test from 'node:test';
import { formatBookmark, loadBookmarks, normalizeUrl } from '../src/lib/bookmarks.js';

test('normalizes a URL with or without https to the same saved value', () => {
  assert.equal(normalizeUrl('https://www.example.com'), 'https://www.example.com/');
  assert.equal(normalizeUrl('www.example.com'), 'https://www.example.com/');
});

test('recovers gracefully from empty, corrupted, legacy, and non-array storage', () => {
  for (const stored of ['', 'not json', '{"url":"https://example.com","slug":"mona-7fk2"}', '{}', 'null']) {
    assert.doesNotThrow(() => loadBookmarks(stored));
    assert.deepEqual(loadBookmarks(stored), []);
  }
});

test('drops malformed bookmarks from otherwise valid storage', () => {
  const stored = JSON.stringify([
    { url: 'https://example.com/', slug: 'mona-7fk2' },
    { url: 'javascript:alert(1)', slug: 'mona-9xyz' },
    { url: 'https://example.com/', slug: 'invalid' },
    null,
  ]);
  assert.deepEqual(loadBookmarks(stored), [
    { url: 'https://example.com/', slug: 'mona-7fk2' },
  ]);
});

test('formats a bookmark with the exact visible separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com/', slug: 'mona-7fk2' }),
    'https://www.example.com/ :: mona-7fk2',
  );
});
