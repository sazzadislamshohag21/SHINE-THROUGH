import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { PRODUCTS } from '../app.js';
import { PRODUCT_MEDIA } from '../product-media.js';

const root = new URL('../', import.meta.url);
const files = (await readdir(root)).filter(name => /\.(js|css|html)$/.test(name));
for (const name of files) {
  const source = await readFile(new URL(name, root), 'utf8');
  if (!name.endsWith('.html')) {
    await transform(source, { loader: name.endsWith('.css') ? 'css' : 'js' });
    continue;
  }
  for (const [, reference] of source.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(reference)) continue;
    const path = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (path) await access(new URL(path, root));
  }
}
for (const product of PRODUCTS) await access(new URL(product.image, root));
for (const media of Object.values(PRODUCT_MEDIA)) {
  for (const view of media.views) {
    for (const key of ['image', 'thumbnail', 'original']) await access(new URL(view[key], root));
  }
  for (const video of media.videos) {
    await access(new URL(video.src, root));
    await access(new URL(video.poster, root));
  }
}

// JPEG SOF dimensions describe actual encoded pixels, independent of filenames.
function jpegDimensions(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Expected a JPEG');
  for (let offset = 2; offset < bytes.length;) {
    assert.equal(bytes[offset++], 0xff, 'Invalid JPEG marker');
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    const length = bytes.readUInt16BE(offset);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return [bytes.readUInt16BE(offset + 5), bytes.readUInt16BE(offset + 3)];
    }
    offset += length;
  }
  throw new Error('Missing JPEG dimensions');
}
const manifest = JSON.parse(await readFile(new URL('asseats/product-squares/sources.json', root)));
for (const item of manifest) {
  await access(new URL(item.source, root));
  const bytes = await readFile(new URL(item.output, root));
  assert.deepEqual(jpegDimensions(bytes), [1080, 1080], item.output);
}

const hashes = new Map();
let mediaCount = 0;
async function inspectMedia(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) await inspectMedia(path);
    else if (/\.(png|jpe?g|webp|svg|gif|mp4|mov)$/i.test(entry.name)) {
      const hash = createHash('sha256').update(await readFile(path)).digest('hex');
      assert(!hashes.has(hash), `Duplicate media: ${fileURLToPath(path)} and ${hashes.get(hash)}`);
      hashes.set(hash, fileURLToPath(path));
      mediaCount++;
    }
  }
}
await inspectMedia(new URL('asseats/', root));
console.log(`Checked code syntax, page links, dynamic media, ${manifest.length} square exports, and ${mediaCount} unique media files.`);
