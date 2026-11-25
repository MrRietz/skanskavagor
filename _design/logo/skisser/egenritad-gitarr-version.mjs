import opentype from 'opentype.js';
import fs from 'node:fs';
const F = (p) => { const b = fs.readFileSync('node_modules/@fontsource/' + p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const serif = F('source-serif-4/files/source-serif-4-latin-700-normal.woff');
const r2 = (v) => Math.round(v * 100) / 100;
const pd = (p) => p.commands.map((c) => c.type === 'Z' ? 'Z' : c.type + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].filter((v) => v !== undefined).map(r2).join(' ')).join('');
function textPath(font, str, x, y, size, track = 0) {
  const sc = size / font.unitsPerEm, gl = font.stringToGlyphs(str);
  const adv = (g, i) => g.advanceWidth * sc + track + (i < gl.length - 1 ? (font.getKerningValue(g, gl[i + 1]) || 0) * sc : 0);
  const w = gl.reduce((a, g, i) => a + adv(g, i), 0) - track;
  let cx = x - w / 2, d = '';
  gl.forEach((g, i) => { d += pd(g.getPath(cx, y, size)); cx += adv(g, i); });
  return d;
}

/* ---------- Gitarr (lokala koordinater, hals uppåt, kroppens mitt i 0,0) ---------- */
const circ = (cx, cy, r) => `M ${cx + r} ${cy} a ${r} ${r} 0 1 0 ${-2 * r} 0 a ${r} ${r} 0 1 0 ${2 * r} 0 Z`;
const rrect = (x, y, w, h, r) => `M ${x + r} ${y} h ${w - 2 * r} a ${r} ${r} 0 0 1 ${r} ${r} v ${h - 2 * r} a ${r} ${r} 0 0 1 ${-r} ${r} h ${-(w - 2 * r)} a ${r} ${r} 0 0 1 ${-r} ${-r} v ${-(h - 2 * r)} a ${r} ${r} 0 0 1 ${r} ${-r} Z`;
const BODY =
  'M 11 -84 C 38 -84 58 -70 58 -46 C 58 -26 40 -18 40 -2 C 40 14 74 28 74 68 C 74 108 42 128 0 128 ' +
  'C -42 128 -74 108 -74 68 C -74 28 -40 14 -40 -2 C -40 -18 -58 -26 -58 -46 C -58 -70 -38 -84 -11 -84 Z';
const SOUND = circ(0, 16, 21) + ' ' + circ(0, 16, 30.5) + ' ' + circ(0, 16, 27.5); // hål + tunn rosett
const BRIDGE = rrect(-22, 88, 44, 8, 4);
const FRETS = [-96, -118, -138, -156, -172].map((y) => rrect(-9, y, 18, 2.6, 1.3)).join(' ');
const NECK = rrect(-9, -206, 18, 128, 2) + ' ' + FRETS;
const HEAD = 'M -15 -206 L 15 -206 L 18 -258 Q 0 -266 -18 -258 Z';
const PEGS = [[-24, -250], [-24, -234], [-24, -218], [24, -250], [24, -234], [24, -218]]
  .map(([x, y]) => `<rect x="${x < 0 ? x - 7 : x - 1}" y="${y - 3.5}" width="8" height="7" rx="3.5"/>`).join('');
const guitar = () =>
  `<path d="${BODY} ${SOUND} ${BRIDGE}" fill-rule="evenodd"/><path d="${NECK}" fill-rule="evenodd"/><path d="${HEAD}"/>${PEGS}`;

/* ---------- Mikrofon (lokala koordinater, kapselns mitt i 0,0) ---------- */
const mic = () => {
  const slots = [-52, -30, -8, 14].map((y) => rrect(-28, y, 56, 8, 4)).join(' ');
  return `<path fill-rule="evenodd" d="${rrect(-46, -86, 92, 150, 46)} ${slots}"/>
  <path d="${rrect(-46, 58, 92, 18, 9)}"/>
  <rect x="-9" y="72" width="18" height="62" rx="4"/>
  <path d="M 0 130 C 0 166 -14 182 -34 192 C -50 199 -66 190 -64 174" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>
  `;
};

/* ---------- Ljudvåg → våg → klippor ---------- */
const HEIGHTS = [18, 30, 48, 74, 108, 150, 198];
const X0 = 168, STEP = 52, BW = 30, SEA = 604;
const WAVE =
  'M 516 604 V 468 C 556 468 590 432 622 384 C 654 332 694 296 744 296 C 802 296 840 338 830 388 ' +
  'C 824 362 798 352 778 366 C 754 382 758 418 786 434 C 808 446 826 456 842 474 V 604 Z';
const CLIFF =
  'M 800 604 L 818 548 L 842 526 L 854 478 L 876 456 L 888 404 L 912 374 L 928 414 L 944 398 L 962 444 L 982 474 L 994 604 Z';
const ROCK = 'M 756 604 L 772 574 L 796 568 L 806 604 Z';
const SLITS = [[524, 20], [562, 15], [600, 10], [636, 6], [670, 3]];
const FOAM = [[860, 360, 7], [840, 336, 5], [876, 338, 4]];

function logo(c, id) {
  const bars = HEIGHTS.map((h, i) => ({ x: X0 + i * STEP, y: SEA - h, h }));
  const barsSvg = () => bars.map((b) => `<rect x="${b.x}" y="${b.y}" width="${BW}" height="${b.h}" rx="${BW / 2}"/>`).join('');
  const t1 = textPath(serif, 'SKÅNSKA', 512, 810, 156, 1);
  const t2 = textPath(serif, 'VÅGOR', 512, 962, 156, 1);
  const G = 'translate(470 338) rotate(46) scale(1.72)';
  const M = 'translate(196 252) rotate(-13) scale(0.98)';
  const H = 1010;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 ${H}" role="img" aria-label="Skånska Vågor">
<defs>
<mask id="${id}g" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="${H}"><rect width="1024" height="${H}" fill="#fff"/>
 <g fill="#000" stroke="#000" stroke-width="28" stroke-linejoin="round">${barsSvg()}</g>
 <g transform="${M}" fill="#000" stroke="#000" stroke-width="22" stroke-linejoin="round"><rect x="-46" y="-86" width="92" height="150" rx="46"/></g></mask>
<mask id="${id}w" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="${H}"><rect width="1024" height="${H}" fill="#fff"/>
 <g fill="#000">${SLITS.map(([x, w]) => `<rect x="${x}" y="280" width="${w}" height="340"/>`).join('')}</g>
 <path d="${CLIFF} ${ROCK}" fill="#000" stroke="#000" stroke-width="26" stroke-linejoin="round"/></mask>
</defs>
<g mask="url(#${id}g)" fill="${c.main}"><g transform="${G}">${guitar()}</g></g>
<g transform="${M}" fill="${c.main}" color="${c.main}">${mic()}</g>
<g fill="${c.accent}">${barsSvg()}</g>
<g mask="url(#${id}w)"><path d="${WAVE}" fill="${c.accent}"/></g>
<g fill="${c.accent}">${FOAM.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
<path d="${CLIFF} ${ROCK}" fill="${c.main}" stroke="${c.main}" stroke-width="7" stroke-linejoin="round"/>
<path d="${t1}${t2}" fill="${c.main}"/>
</svg>`;
}
const LIGHT = { main: '#17496b', accent: '#6db3ce' };
const DARK = { main: '#f8f2e7', accent: '#6db3ce' };
const l = logo(LIGHT, 'l'), d = logo(DARK, 'd');
fs.writeFileSync('out/logo-ren.svg', l); fs.writeFileSync('out/logo-ren-mork.svg', d);
fs.writeFileSync('out/ren.html', `<!doctype html><meta charset="utf-8"><title>Ren logga</title><style>body{margin:0;padding:20px;background:#ccc;display:grid;grid-template-columns:1fr 1fr;gap:14px}
div{display:grid;place-items:center;padding:20px}svg{width:100%;max-width:640px;height:auto}.b{background:#fbf9f3}.c{background:#0f3447}</style>
<div class="b">${l}</div><div class="c">${d}</div>`);
console.log('ok');
