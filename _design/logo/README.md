# Loggan

Färdiga filer ligger i `public/img/logo/`:

| Fil | Används till |
| --- | --- |
| `logo.svg` / `logo.png` | Hela loggan, blå. För ljus bakgrund (affischer, tryck). |
| `logo-ljus.svg` / `logo-ljus.png` | Hela loggan, kräm. För mörk bakgrund och foton (sajtens hero och footer). |
| `ikon.svg` / `ikon.png` | Bara bilden utan text, blå. |
| `ikon-ljus.svg` / `ikon-ljus.png` | Bara bilden utan text, kräm (sajtens meny). |
| `favicon.svg`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Flikikon och hemskärmsikon. |

Färger: blå `#17496b`, ljusblå `#6db3ce`, kräm `#f8f2e7`. Typsnitt: Source Serif 4 Bold (omgjord till kurvor).

## Bygga om

Gitarren och mikrofonen är vektoriserade ur originalloggan (`public/img/skanska_vagor_logo.png`).
Ljudvågen, havsvågen, klipporna och texten ritas av `generator/logo.mjs`.

```sh
cd _design/logo/generator
npm install
python prep-mask.py   # bara om gitarren/mikrofonen ska spåras om (kräver Pillow)
node trace.mjs        # mask-dark.png -> dark.d
node logo.mjs         # skriver SVG:erna till public/img/logo/
node png.mjs          # PNG-exporterna
```

## Skisser

`skisser/` innehåller förslagen på vägen dit: de första fyra koncepten (ring, emblem, ordmärke, vågform),
en skiss från bildgeneratorn, fyra SVG-förslag (emblem, bricka, liggande, affisch) och en version med
egenritad gitarr och mikrofon som valdes bort.
