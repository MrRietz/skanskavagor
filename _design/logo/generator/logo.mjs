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
const DARK = fs.readFileSync(new URL('./dark.d', import.meta.url), 'utf8'); // gitarr + mick, vektoriserade ur originalloggan (4x-upplöst spår)

const SEA = 600, C = 520, STEP = 55, X0 = 165;
// 0–6: ljudvåg (symmetrisk kring C). 7–10: staplarna växer, sjunker mot havsytan och tätnar. Sedan en hel våg.
const SOUND = [8, 16, 28, 48, 76, 66, 84];
const bars = SOUND.map((h, i) => ({ cx: X0 + i * STEP, w: 20, top: C - h, bot: C + h }));
[[24, 420], [30, 380], [36, 338], [42, 300]].forEach(([w, top], k) => bars.push({ cx: X0 + (7 + k) * STEP, w, top, bot: SEA }));
const WX = X0 + 11 * STEP - 26; // vågens vänsterkant
const P = (x, y) => `${WX + x} ${y + 258}`; // vågens lokala koordinater, botten = 342
const WAVE =
  `M ${P(0, 326)} V ${258 + 84} C ${P(0, 34)} ${P(40, 0)} ${P(100, 0)} C ${P(164, 0)} ${P(210, 44)} ${P(210, 104)} ` +
  `C ${P(210, 152)} ${P(176, 178)} ${P(138, 168)} C ${P(156, 152)} ${P(160, 124)} ${P(136, 112)} ` +
  `C ${P(108, 98)} ${P(86, 128)} ${P(92, 166)} C ${P(100, 214)} ${P(152, 252)} ${P(192, 290)} ` +
  `L ${P(204, 326)} Q ${P(204, 342)} ${P(188, 342)} H ${WX + 16} Q ${P(0, 342)} ${P(0, 326)} Z`;
const CX = WX + 196;
const CLIFF =
  `M ${CX} ${SEA} L ${CX + 16} 534 L ${CX + 40} 514 L ${CX + 50} 468 L ${CX + 72} 448 L ${CX + 84} 400 L ${CX + 106} 372 L ${CX + 122} 406 L ${CX + 136} 394 L ${CX + 150} 434 L ${CX + 166} 464 L ${CX + 176} ${SEA} Z`;
const ROCK = `M ${CX - 30} ${SEA} L ${CX - 18} 566 L ${CX + 2} 560 L ${CX + 10} ${SEA} Z`;
const FOAM = [[WX + 230, 300, 7], [WX + 244, 276, 5], [WX + 254, 300, 4], [WX + 226, 268, 3.5]];
// vattenlinje som gitarrkroppen "sjunker" i
let WL = 'M 0 0 H 1200 V 300 L 700 300';
for (let x = 700; x >= 280; x -= 5) WL += ` L ${x} ${(424 + 6 * Math.sin(((x - 280) / 110) * 2 * Math.PI)).toFixed(1)}`;
WL += ' L 280 1000 H 0 Z';
const rr = (b) => `<rect x="${b.cx - b.w / 2}" y="${b.top}" width="${b.w}" height="${b.bot - b.top}" rx="${b.w / 2}"/>`;

function logo(c, id, o = {}) {
  const text = o.text !== false;
  const cx = 636;
  const t1 = textPath(serif, 'SKÅNSKA', cx, 800, 168, 2);
  const t2 = textPath(serif, 'VÅGOR', cx, 962, 168, 2);
  const W = 1200, H = 1000;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb || '130 40 1000 960'}" role="img" aria-label="Skånska Vågor">${o.bg || ''}
<defs>
 <clipPath id="${id}gc"><path d="${WL}"/></clipPath>
 <mask id="${id}gm" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/>
  <g fill="#000" stroke="#000" stroke-width="22">${bars.map(rr).join('')}</g>
  <path d="${WAVE}" fill="#000" stroke="#000" stroke-width="20" stroke-linejoin="round"/>
  <circle cx="510" cy="365" r="39.5" fill="none" stroke="#000" stroke-width="12.5"/></mask>
 <mask id="${id}wm" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/>
    <path d="${CLIFF} ${ROCK}" fill="#000" stroke="#000" stroke-width="22" stroke-linejoin="round"/></mask>
</defs>
<g mask="url(#${id}gm)"><g clip-path="url(#${id}gc)"><g transform="scale(.25)"><path d="${DARK}" fill="${c.main}" fill-rule="evenodd"/></g><circle cx="510" cy="365" r="54" fill="${c.main}"/></g></g>
<g fill="${c.accent}">${bars.map(rr).join('')}</g>
<g mask="url(#${id}wm)"><path d="${WAVE}" fill="${c.accent}"/></g>
<g fill="${c.accent}">${FOAM.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
<path d="${CLIFF} ${ROCK}" fill="${c.main}" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
${text ? `<path d="${t1}${t2}" fill="${c.main}"/>` : ''}
</svg>`;
}
const BLUE = { main: '#17496b', accent: '#6db3ce' };
const CREAM = { main: '#f8f2e7', accent: '#6db3ce' };
const ICON_VB = '130 50 1000 560';
const FAV_VB = '100 -150 1060 1060';
const favBg = `<rect x="100" y="-150" width="1060" height="1060" rx="200" fill="#f8f2e7"/>`;
const files = {
  'logo.svg': logo(BLUE, 'a'),
  'logo-ljus.svg': logo(CREAM, 'b'),
  'ikon.svg': logo(BLUE, 'c', { text: false, vb: ICON_VB }),
  'ikon-ljus.svg': logo(CREAM, 'd', { text: false, vb: ICON_VB }),
  'favicon.svg': logo(BLUE, 'e', { text: false, vb: FAV_VB, bg: favBg }),
};
const OUT = new URL('../../../public/img/logo/', import.meta.url);
for (const [n, svg] of Object.entries(files)) fs.writeFileSync(new URL(n, OUT), svg);
console.log('ok');
