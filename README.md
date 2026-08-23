# Grupo CESPAD — Landing Page

Landing page para **Grupo CESPAD**, empresa de canchas sintéticas 
premium con proyectos llave en mano en Argentina. Cubre fútbol, 
pádel, tenis, rugby, hockey y parquización.

🔗 **[Ver en vivo → grupocespad.com.ar](https://grupocespad.com.ar)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

## Preview

### Desktop
![Vista desktop](preview-desktop.png)

### Mobile
![Vista mobile](preview-mobile.png)

## Stack

- HTML5 semántico con ARIA + JSON-LD para SEO.
- CSS3 con custom properties, BEM y arquitectura mobile-first 
  (mobile → tablet → desktop → wide).
- JavaScript vanilla en IIFEs (Intersection Observer, contadores 
  animados, parallax, validación de formulario, tabs y swatches 
  interactivos).
- Deploy en Vercel con dominio propio.
- Sin frameworks, sin build step.

## Optimizaciones de performance

Landing optimizada para +90 PageSpeed en mobile y desktop:

- CSS crítico inline del above-the-fold.
- Preload de fuentes y LCP.
- Imágenes en WebP con compresión selectiva y width/height reales 
  para evitar CLS.
- Fuentes con lazy load.
- content-visibility en secciones below-the-fold.
- Diferido de styles.css externo.

## Características

- Diseño mobile-first completamente responsive.
- Sección Deportes con tabs interactivos y swatches de colores 
  por deporte que actualizan imagen y estado.
- Formulario de contacto con validación en tiempo real y envío 
  directo a WhatsApp Business.
- Animaciones de scroll con Intersection Observer.
- Parallax en el hero.
- Contadores animados en la sección de estadísticas.
- Accesibilidad: aria-labels, prefers-reduced-motion, focus-visible, 
  navegación por teclado en tabs.

## Estructura
├── index.html
├── styles.css
├── main.js
├── img/
│ ├── aereo-.webp (fotos verticales del hero)
│ ├── aereo--horizontal.webp (fotos de cards de deportes)
│ ├── canchas/ (variantes por color de pádel y tenis)
│ ├── pastos/ (texturas de swatches)
│ ├── proyectos/ (fotos de casos)
│ └── _originales/ (fuente de recompresión, no se sirven)
└── vercel.json


## Licencia

MIT