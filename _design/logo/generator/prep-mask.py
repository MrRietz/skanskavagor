"""Gör en ren svartvit mask av gitarr + mikrofon ur originalloggan (public/img/skanska_vagor_logo.png).
Fyller hacken som originalets staplar skar upp i gitarrkroppen och jämnar ut kanterna.
Resultat: mask-dark.png (4x upplöst) som trace.mjs gör om till dark.d."""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path

HERE = Path(__file__).parent
SRC = HERE.parents[2] / 'public' / 'img' / 'skanska_vagor_logo.png'
im = Image.open(SRC).convert('RGB'); W, H = im.size; src = im.load()
is_dark = lambda p: p[0] < 75 and p[2] > 80 and p[1] < 120

dark = Image.new('L', (W, H), 255); pd = dark.load()
for y in range(580):
    for x in range(W):
        if is_dark(src[x, y]): pd[x, y] = 0

cx, cy = 515.4, 367.0  # ljudhålet
orig = dark.copy(); po = orig.load()
for y in range(392, 452):
    for x in range(300, 640):
        if po[x, y] == 255 and (x - cx) ** 2 + (y - cy) ** 2 > 58 ** 2:
            if any(po[x - d, y] == 0 for d in range(1, 46)) and any(po[x + d, y] == 0 for d in range(1, 46)):
                pd[x, y] = 0
ImageDraw.Draw(dark).rectangle([362, 372, 432, 452], fill=0)

S = 4
big = dark.resize((W * S, H * S), Image.LANCZOS)
th = lambda i: i.point(lambda v: 0 if v < 128 else 255)
soft = th(big.filter(ImageFilter.GaussianBlur(4.5 * S)))   # gitarrkropp och hals
mic = th(big.filter(ImageFilter.GaussianBlur(2.4 * S)))    # mikrofon
fine = th(big.filter(ImageFilter.GaussianBlur(1.6 * S)))   # stämskruvar
reg = Image.new('L', big.size, 0); ImageDraw.Draw(reg).rectangle([0, 0, W * S, 190 * S], fill=255)
reg = reg.filter(ImageFilter.GaussianBlur(10 * S))
regm = Image.new('L', big.size, 0); ImageDraw.Draw(regm).rectangle([0, 0, 300 * S, H * S], fill=255)
regm = regm.filter(ImageFilter.GaussianBlur(6 * S))
out = Image.composite(mic, Image.composite(fine, soft, reg), regm)
th(out).save(HERE / 'mask-dark.png')
print('mask-dark.png klar')
