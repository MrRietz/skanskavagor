import opentype from 'opentype.js';
import fs from 'node:fs';

const F = (p) => {
  const b = fs.readFileSync('node_modules/@fontsource/' + p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const serif = F('source-serif-4/files/source-serif-4-latin-900-normal.woff');
const cond = F('barlow-condensed/files/barlow-condensed-latin-600-normal.woff');

const LIGHT = { bg: '#f8f2e7', deep: '#0f3447', sea: '#1d5b73', mist: '#6fb0c8', coral: '#e8662f' };
const DARK = { bg: '#0f3447', deep: '#f8f2e7', sea: '#6fb0c8', mist: '#1d5b73', coral: '#f07a45' };

const r2 = (v) => Math.round(v * 100) / 100;
function pd(p) {
  return p.commands.map((c) => c.type === 'Z' ? 'Z' : c.type + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].filter((v) => v !== undefined).map(r2).join(' ')).join('');
}
// text -> path data, with tracking; anchor: 'start' | 'middle' | 'end'
function textPath(font, str, x, y, size, track = 0, anchor = 'start') {
  const scale = size / font.unitsPerEm;
  let w = 0;
  const glyphs = font.stringToGlyphs(str);
  glyphs.forEach((g, i) => {
    w += g.advanceWidth * scale + track;
    if (i < glyphs.length - 1) w += (font.getKerningValue(g, glyphs[i + 1]) || 0) * scale;
  });
  w -= track;
  let cx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  let d = '';
  glyphs.forEach((g, i) => {
    d += pd(g.getPath(cx, y, size));
    cx += g.advanceWidth * scale + track;
    if (i < glyphs.length - 1) cx += (font.getKerningValue(g, glyphs[i + 1]) || 0) * scale;
  });
  return { d, w };
}

const GUITAR_BODY =
  'M 9 -72 C 38 -72 47 -46 37 -22 C 29 -6 31 5 43 17 C 63 41 55 90 0 90 C -55 90 -63 41 -43 17 C -31 5 -29 -6 -37 -22 C -47 -46 -38 -72 -9 -72 Z' +
  ' M 15 8 a 15 15 0 1 0 -30 0 a 15 15 0 1 0 30 0 Z';
// guitar centred on body, neck up. Returns SVG group content (local coords).
function guitar(fill) {
  return `<path d="${GUITAR_BODY}" fill="${fill}" fill-rule="evenodd"/>
  <rect x="-7.5" y="-196" width="15" height="130" fill="${fill}"/>
  <path d="M -13 -196 L 13 -196 L 15 -232 Q 0 -238 -15 -232 Z" fill="${fill}"/>
  <rect x="-24" y="46" width="48" height="8" rx="3" fill="${fill}"/>`;
}
// mask-safe silhouette (solid) used to carve gaps out of what lies behind
function guitarCut(stroke) {
  return `<g fill="#000" stroke="#000" stroke-width="${stroke}" stroke-linejoin="round">
  <path d="M 9 -72 C 38 -72 47 -46 37 -22 C 29 -6 31 5 43 17 C 63 41 55 90 0 90 C -55 90 -63 41 -43 17 C -31 5 -29 -6 -37 -22 C -47 -46 -38 -72 -9 -72 Z"/>
  <rect x="-7.5" y="-196" width="15" height="130"/>
  <path d="M -13 -196 L 13 -196 L 15 -232 Q 0 -238 -15 -232 Z"/></g>`;
}

// wave crest in a 100x80 box, baseline y=80
const CREST =
  'M 0 80 C 4 40 28 6 62 6 C 86 6 98 24 90 38 C 86 28 74 26 66 32 C 56 40 62 58 80 66 C 88 70 96 72 100 80 Z';
function crest(x, y, s, fill) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="${CREST}" fill="${fill}"/>`;
}

function bars(x0, base, n, w, gap, maxH, colors) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const h = 16 + maxH * Math.pow(Math.sin(Math.PI * (0.18 + 0.82 * t)), 1.2) * (0.6 + 0.4 * Math.sin(i * 1.9 + 0.7));
    g += `<rect x="${x0 + i * (w + gap)}" y="${base - h / 2}" width="${w}" height="${h}" rx="${w / 2}" fill="${colors(i, n)}"/>`;
  }
  return g;
}

const svg = (vb, body, c, id) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="Skånska Vågor">${body}</svg>`;

/* A · Emblemet: gitarr framför sol, ljudvågor som blir vågor */
function A(c, id) {
  const wm1 = textPath(serif, 'SKÅNSKA', 320, 606, 112, 2, 'middle');
  const wm2 = textPath(serif, 'VÅGOR', 320, 712, 112, 2, 'middle');
  const body = `
  <defs><mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="820">
    <rect width="640" height="820" fill="#fff"/>
    <g transform="translate(240 300) rotate(28) scale(1.2)">${guitarCut(15)}</g></mask></defs>
  <circle cx="404" cy="190" r="104" fill="${c.coral}" mask="url(#${id}m)"/>
  <g transform="translate(240 300) rotate(28) scale(1.2)">${guitar(c.deep)}</g>
  ${bars(44, 452, 14, 11, 9.5, 84, (i, n) => (i < 4 ? c.mist : i < 9 ? c.sea : c.deep))}
  ${crest(340, 378, 1.0, c.sea)}${crest(432, 378, 1.0, c.mist)}${crest(524, 378, 1.0, c.deep)}
  <path d="${wm1.d}" fill="${c.deep}"/><path d="${wm2.d}" fill="${c.sea}"/>`;
  return svg('0 0 640 740', body, c, id);
}

/* B · Märket: rund bricka */
function B(c, id) {
  const wm1 = textPath(serif, 'SKÅNSKA', 320, 646, 100, 2, 'middle');
  const wm2 = textPath(serif, 'VÅGOR', 320, 738, 100, 2, 'middle');
  const tag = textPath(cond, 'COUNTRY · ROCK · POP', 320, 790, 26, 9, 'middle');
  const body = `
  <defs><clipPath id="${id}c"><circle cx="320" cy="270" r="236"/></clipPath>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="820">
    <rect width="640" height="820" fill="#fff"/><g transform="translate(300 300) rotate(26) scale(.92)">${guitarCut(18)}</g></mask></defs>
  <circle cx="320" cy="270" r="250" fill="${c.deep}"/>
  <g clip-path="url(#${id}c)">
    <rect x="0" y="0" width="640" height="560" fill="${c.bg}"/>
    <circle cx="380" cy="190" r="104" fill="${c.coral}" mask="url(#${id}m)"/>
    <g transform="translate(300 300) rotate(26) scale(.92)">${guitar(c.deep)}</g>
    <rect x="0" y="440" width="640" height="200" fill="${c.sea}"/>
    ${crest(60, 396, 1.05, c.sea)}${crest(176, 396, 1.05, c.mist)}${crest(292, 396, 1.05, c.sea)}${crest(408, 396, 1.05, c.mist)}${crest(524, 396, 1.05, c.sea)}
    <rect x="0" y="476" width="640" height="200" fill="${c.deep}" opacity=".0"/>
  </g>
  <path d="${wm1.d}" fill="${c.deep}"/><path d="${wm2.d}" fill="${c.sea}"/><path d="${tag.d}" fill="${c.deep}"/>`;
  return svg('0 0 640 820', body, c, id);
}

/* C · Liggande: ikon till vänster, ordmärke till höger */
function C(c, id) {
  const wm1 = textPath(serif, 'SKÅNSKA', 330, 150, 112, 2);
  const wm2 = textPath(serif, 'VÅGOR', 330, 258, 112, 2);
  const tag = textPath(cond, 'COUNTRY · ROCK · POP', 334, 312, 30, 10);
  const body = `
  <defs><mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="340">
    <rect width="1000" height="340" fill="#fff"/><g transform="translate(150 190) rotate(28) scale(.68)">${guitarCut(20)}</g></mask></defs>
  <circle cx="190" cy="108" r="64" fill="${c.coral}" mask="url(#${id}m)"/>
  <g transform="translate(150 190) rotate(28) scale(.68)">${guitar(c.deep)}</g>
  ${bars(18, 300, 7, 9, 8, 70, (i, n) => (i < 3 ? c.mist : c.sea))}
  ${crest(118, 262, .62, c.sea)}${crest(176, 262, .62, c.mist)}${crest(234, 262, .62, c.deep)}
  <path d="${wm1.d}" fill="${c.deep}"/><path d="${wm2.d}" fill="${c.sea}"/><path d="${tag.d}" fill="${c.coral}"/>`;
  const w = Math.max(wm1.w, wm2.w) + 340;
  return svg(`0 0 ${Math.ceil(w)} 340`, body, c, id);
}

/* D · Affischen: bara ordmärke, solen går upp bakom, ljudvåg som horisont */
function D(c, id) {
  const wm1 = textPath(serif, 'SKÅNSKA', 320, 330, 120, 1, 'middle');
  const wm2 = textPath(serif, 'VÅGOR', 320, 458, 120, 1, 'middle');
  const tag = textPath(cond, 'COUNTRY · ROCK · POP', 320, 548, 30, 14, 'middle');
  let eq = '';
  const n = 33, w = 8, gap = 11.2;
  const x0 = 320 - (n * w + (n - 1) * gap) / 2;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const h = 12 + 58 * Math.pow(Math.sin(Math.PI * t), 1.4) * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.3 + 0.4)));
    eq += `<rect x="${x0 + i * (w + gap)}" y="${586 - h / 2}" width="${w}" height="${h}" rx="4" fill="${i % 7 === 3 ? c.coral : c.sea}"/>`;
  }
  const body = `
  <defs><clipPath id="${id}c"><rect x="0" y="0" width="640" height="236"/></clipPath>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="660">
    <rect width="640" height="660" fill="#fff"/>
    <path d="${wm1.d}" fill="#000" stroke="#000" stroke-width="14" stroke-linejoin="round"/></mask></defs>
  <g clip-path="url(#${id}c)"><circle cx="320" cy="236" r="190" fill="${c.coral}" mask="url(#${id}m)"/></g>
  <path d="${wm1.d}" fill="${c.deep}"/><path d="${wm2.d}" fill="${c.sea}"/>
  <path d="${tag.d}" fill="${c.deep}"/>${eq}`;
  return svg('0 0 640 650', body, c, id);
}

fs.mkdirSync('out', { recursive: true });
const defs = { A, B, C, D };
const names = { A: 'emblemet', B: 'brickan', C: 'liggande', D: 'affischen' };
let sheet = `<!doctype html><meta charset="utf-8"><title>Skånska Vågor – fyra loggor</title>
<style>body{margin:0;padding:24px;background:#ccc;font:600 13px system-ui;color:#222}
h2{margin:26px 0 8px;letter-spacing:.08em;text-transform:uppercase}
.r{display:grid;grid-template-columns:1fr 1fr;gap:14px}.p{display:grid;place-items:center;padding:34px 20px;min-height:340px}
.l{background:#f8f2e7}.d{background:#0f3447}svg{max-width:100%;max-height:420px;height:auto;width:auto}</style>`;
for (const k of Object.keys(defs)) {
  const l = defs[k](LIGHT, k + 'l');
  const d = defs[k](DARK, k + 'd');
  fs.writeFileSync(`out/logo-${k.toLowerCase()}-${names[k]}.svg`, l);
  fs.writeFileSync(`out/logo-${k.toLowerCase()}-${names[k]}-mork.svg`, d);
  sheet += `<h2>${k} · ${names[k]}</h2><div class="r"><div class="p l">${l}</div><div class="p d">${d}</div></div>`;
}
fs.writeFileSync('out/sheet.html', sheet);
console.log('ok');
