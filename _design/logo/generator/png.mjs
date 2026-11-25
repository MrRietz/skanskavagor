import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const DIR = fileURLToPath(new URL('../../../public/img/logo/', import.meta.url));
const jobs = [
  ['logo.svg', 'logo.png', 2000], ['logo-ljus.svg', 'logo-ljus.png', 2000],
  ['ikon.svg', 'ikon.png', 1024], ['ikon-ljus.svg', 'ikon-ljus.png', 1024],
  ['favicon.svg', 'favicon-32.png', 32], ['favicon.svg', 'favicon-192.png', 192], ['favicon.svg', 'apple-touch-icon.png', 180],
];
for (const [src, out, w] of jobs) await sharp(DIR + src, { density: 600 }).resize({ width: w }).png().toFile(DIR + out);
console.log('ok');
