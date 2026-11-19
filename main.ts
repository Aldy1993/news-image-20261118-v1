// "The World in One Day" — Wednesday 18 November 2026.
// news-image-20261118 entry. The program publishes the front-page image that
// sits next to it: 41 stories across 9 regions, a masthead dated 18 November
// 2026, a numbered world map, and a lead on GTA VI's 99/100 reviews as the
// rollout began. No network, no randomness: the same input always yields the
// same output bytes.
//
// Run it outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ONE_MIB = 1024 * 1024;
const SIDE_LIMIT = 1024;

// The eight bytes every PNG begins with.
const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
// The twelve bytes every PNG ends with: a zero-length IEND chunk.
const TRAILER = [0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82];

function fail(message) {
  throw new Error(`news-image-20261118: ${message}`);
}

// Read the image and reject anything that is not a whole PNG within limits.
async function loadImage(path) {
  const data = await readFile(path);
  if (data.length === 0) fail('entry.png is empty');
  if (data.length > ONE_MIB) {
    fail(`entry.png is ${data.length} bytes, over the 1 MiB limit`);
  }
  const head = data.subarray(0, 8);
  if (!head.equals(Buffer.from(SIGNATURE))) {
    fail('entry.png does not start with the PNG signature');
  }
  const tail = data.subarray(data.length - 12);
  if (!tail.equals(Buffer.from(TRAILER))) {
    fail('entry.png does not end with a complete IEND chunk');
  }
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width > SIDE_LIMIT || height > SIDE_LIMIT) {
    fail(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
  }
  return { data, width, height };
}

async function publish() {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, 'entry.png');
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const target = join(outDir, 'entry.png');

  const { data, width, height } = await loadImage(source);
  await mkdir(outDir, { recursive: true });
  await writeFile(target, data);

  // Read the copy back: it must match the source byte for byte, not merely
  // in length, before the run is allowed to report success.
  const written = await readFile(target);
  if (!written.equals(data)) {
    fail(`output differs from entry.png after writing ${written.length} bytes`);
  }
  console.log(`published ${target}: ${data.length} bytes, ${width}x${height}`);
}

await publish();
