# Landing del Centro Cultural Japonés de Ensenada, A.C.

Sitio de una sola página para la solicitud de exención de cuota del Apple Developer Program. El contenido viene del sitio anterior en Wix (`asociacionjaponesa.wixsite.com/inicio`), actualizado.

## Stack

- Astro 7 (HTML estático) + Tailwind CSS v4
- Islas de React solo donde hace falta:
  - Texto con desenfoque del proverbio: Space UI, `blur-reveal-text`
  - Menú móvil: Sketcher UI, `expandable-mobile-nav`
- Botones "slide text" de Kokonut UI, pasados a Astro (solo CSS)
- Animaciones: anime.js (entradas y scroll) y Motion (componentes de React)
- Tipografías: Shippori Mincho y Zen Kaku Gothic New (Fontsource, sin Google Fonts)

Con "reducir movimiento" activado en el sistema, las animaciones se apagan.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/
npx astro check   # tipos
```

## Dónde cambiar cosas

- Nombre legal, dirección, teléfono, correo y redes: `src/data/site.ts`
- Textos de las secciones: `src/pages/index.astro`
- Colores y tipografías: `src/styles/global.css` (de `paleta de colores, Claro, Oscuro.md`)

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Variable de entorno: `NODE_VERSION=22`
