# Landing del Centro Cultural Japonés de Ensenada, A.C.

Sitio de una sola página para la solicitud de exención de cuota del Apple Developer Program. El contenido viene del sitio anterior en Wix (`asociacionjaponesa.wixsite.com/inicio`), actualizado.

## Stack

- Astro 7 (HTML estático) + Tailwind CSS v4
- Islas de React solo donde hace falta:
  - Liquid Glass Social de Sketcher UI para las redes
  - Manifiesto que se revela con el scroll: Space UI, `scroll-text-reveal`
  - Kanji del proverbio con desenfoque: Space UI, `blur-reveal-text`
  - Tarjetas apiladas de actividades: adaptadas de "Sticky Scroll Cards" de Componentry
  - Líneas de fondo del inicio: Kokonut UI, `background-paths`
  - Menú móvil: Sketcher UI, `expandable-mobile-nav`
- Botones "slide text" de Kokonut UI, pasados a Astro (solo CSS)
- Animaciones: anime.js (cortina entre páginas, entradas, marquesina y giros con el scroll), Motion (componentes de React) y Lenis (scroll suave)
- Seis páginas (`/`, `/nosotros`, `/clases`, `/actividades`, `/escuela`, `/contacto`) con el enrutador de Astro (`ClientRouter`). Al cargar sale la intro de saludos (idea del "Words Preloader" de Space UI) y al cambiar de página sube una cortina con el nombre de la página en japonés: `src/components/site/Curtain.astro`
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
- Textos de cada página: `src/pages/*.astro`
- Fotos: `src/assets/fotos/`
- Colores y tipografías: `src/styles/global.css` (de `paleta de colores, Claro, Oscuro.md`)

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Variable de entorno: `NODE_VERSION=22`
