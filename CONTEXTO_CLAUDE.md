# Contexto — Landing Grupo CESPAD

Este archivo es autosuficiente: alcanza con leerlo para retomar el proyecto sin
conocer conversaciones anteriores. Si algo cambia, se actualiza acá.

---

## 1. El negocio

Grupo CESPAD vende e instala canchas de césped sintético en **Córdoba,
Argentina**, con obras también en Buenos Aires. Deportes: pádel, tenis, fútbol,
rugby y hockey. Línea secundaria: **parquización** (jardines, quinchos, terrazas,
bares, espacios comerciales).

Es la empresa de **Marcelo**, el papá de Sebas. Sebas hace la web.

Ticket alto y decisión meditada, no compra impulsiva. Los proyectos van desde un
jardín particular hasta un club con varias canchas.

**Objetivo comercial del sitio:** que el visitante escriba por WhatsApp. No hay
checkout ni reserva online. La conversión ES el clic a WhatsApp.

Tres perfiles de cliente:
- **A — Dueño de complejo deportivo.** Busca garantía, plazos y ver obra grande
  terminada. Es el ticket más alto.
- **B — Familia con jardín o quincho.** Decisión más emocional, quiere ver "cómo
  va a quedar" en una casa parecida a la suya.
- **C — Arquitecta/paisajista.** Necesita ficha técnica y portfolio para
  especificar el material en proyectos de sus clientes.

---

## 2. Dónde vive el proyecto

- **Local:** `D:\Desarrollo Web Sebas\GREENSET_COURT Paralelo para actualizar\`
- **Repo:** https://github.com/Seba-fernandez/Grupo-Cespad-actualizacion
- **Deploy producción (rama `main`):** https://grupo-cespad-actualizacion.vercel.app/
- **Rama de trabajo actual:** `bloque-4b-visuales`
- Cada rama pusheada genera su propio preview en Vercel. **Ojo:** los previews
  de rama están protegidos por Vercel Authentication (piden login), la URL de
  producción no. Si se audita "el deploy" sin aclarar cuál, es fácil terminar
  mirando `main` en vez de la rama en la que se está trabajando.
- Migrar a `grupocespad.com.ar` cuando esté comprado (a nombre de Marcelo, no de
  Sebas).

---

## 3. Reglas de git (estrictas)

Sebas no domina git y quiere máxima prudencia.

- **Permitido para Claude:** `status`, `checkout -b`, `add`, `commit`, `branch`,
  `log`, `diff`, `show`.
- **PROHIBIDO para Claude:** `push`, `merge`, `rebase`, `reset --hard`,
  `branch -d/-D`, `checkout main` mientras se trabaja en una rama, y cualquier
  comando destructivo.
- Push, merge y borrado de ramas los hace **Sebas a mano** cuando aprueba.
- Cada bloque de rediseño trabaja en **su propia rama**.

---

## 4. Cómo trabajar con Sebas

- Español rioplatense.
- Archivos completos listos para pegar, no diffs sueltos.
- Cambios quirúrgicos: línea exacta + consecuencia.
- Antes/después con justificación en cada decisión.
- **No inventar contenido.** Si falta un dato, va placeholder explícito.
- Sin emojis en el código, sólo SVG del sprite.
- Código limpio, **sin sobreingeniería ni cosas que no pidió**.
- Bloque por bloque, paso a paso. Una variable por vez.
- No asumir que se aplicaron cambios anteriores: leer los archivos primero.

---

## 5. Stack y archivos clave

HTML5 semántico + CSS3 con custom properties + JS vanilla en IIFEs.
**Sin frameworks, sin build step, sin librerías.** Se sirve tal cual.

| Archivo | Por qué importa |
|---|---|
| `index.html` | Todo el markup. Incluye el **sprite SVG** (`<defs>` con todos los íconos) y un bloque de **CSS crítico inline** en el `<head>` que duplica a propósito reglas de `styles.css` para el primer render. **Si tocás header o hero en `styles.css`, hay que tocar también el inline o se desincronizan.** |
| `styles.css` | Hoja principal, cargada diferida. Índice numerado arriba del archivo. Todo sale de tokens en `:root`. |
| `main.js` | Módulos IIFE independientes, cada uno hace early-return si su markup no existe (por eso se puede borrar una sección sin romper nada). Acá vive `CONFIG` con el número de WhatsApp: **es el único lugar donde se toca**, alimenta el FAB, el teléfono visible y los botones de cada deporte. |
| `img/_originales/` | Fuente de reprocesamiento, no se sirve. Incluye `logos/` con los logos viejos (ver punto 9). |

Fuentes (Google Fonts): **Bebas Neue** (display) + **DM Sans** (body).
`IntersectionObserver` para reveals y contadores.

### Convenciones de imágenes
- `pastos/*.webp` → 200px, q78
- `canchas/*.webp` → 1200px, q80
- `aereo-*.webp` (hero verticales) → 900px, q75-78
- `aereo-*-horizontal.webp` (cards deportes) → 1200px, q78
- `proyectos/*.webp` → 1200px, q80
- `textura-pasto.webp` → 1200px, q72
- `nosotrosfoto.webp` / `parquizacion*.webp` → 900-1200px, q78
- `og-image.jpg` → JPG obligatorio (WhatsApp/Facebook no leen WebP en OG)
- `favicon.png` → PNG obligatorio
- cwebp 1.4.0 en `C:\tools\libwebp\libwebp-1.4.0-windows-x64\bin`

---

## 6. Qué está hecho

**Performance (bloques 1, 2A-2D).** Payload de 12.6MB a ~3MB. Compresión de
imágenes, preload del LCP, CSS crítico inline, `content-visibility`, preload de
las 2 woff2 del above-the-fold. Resultado: **mobile PageSpeed 92** (FCP 0.9s,
LCP 2.8s), **desktop 90**. CLS desktop 0.191, aceptado como no crítico porque el
tráfico principal es mobile.

**Bloque 4A — Deportes.** Container de 90rem sólo en esta sección. Tabs
laterales en desktop con altura fija distribuidos en columna; en mobile, tabs
arriba en fila. Imagen con radios asimétricos, altura según el ratio real de
cada foto, `min-height: 280px` en mobile para las fotos panorámicas. Título y
descripción van en overlay sobre la foto. Deep-link: tocar un ícono de deporte
en el hero activa el tab correcto y hace scroll (2 clics hasta WhatsApp).

**Bloque 4B — Sistema visual glass.** `backdrop-filter` en tabs de Deportes,
panel de Deportes y cards de "Por qué elegirnos". Textura grain (SVG
feTurbulence inline, ~700 bytes, 0 requests) en Nosotros y Contacto. Pulse del
nav-cta y hover del FAB pasados a propiedades compositables.

**Bloque 4B.1 — Refinamiento del glass.** Sheen diagonal + inset highlight
superior que simula el filo de luz del vidrio, en vez de blur plano. Blur y
saturate más generosos. Fix de íconos del hero que se veían en miniatura en
mobile (el círculo no baja de 44px por accesibilidad, se redujo el padding
interno a 0.55rem).

**Contenido definitivo (19-09-2026).** Ver punto 7.

### Qué NO tocar
Esto ya funciona y costó trabajo:
- El **hero de 5 paneles** con selector de deporte. Es lo más distintivo del
  sitio, nadie en el rubro lo hace.
- El **deep-link** hero → tab de Deportes (medido: tab activo en 42ms).
- Los **swatches** de color de césped (cambian la foto). Es un configurador de
  producto en miniatura, un diferencial real.
- La **accesibilidad**: ARIA completo en los tabs, navegación por teclado,
  targets de 44px, contraste AA verificado.
- El **formulario** que arma el mensaje de WhatsApp con los datos estructurados.
- El copy de la **Comparativa**: es el de mejor voz de oficio del sitio, sirve de
  referencia de tono.

---

## 7. Contenido definitivo (cerrado por Marcelo/Sebas)

Definitivo **por ahora**: cuando haya ventas se suma más info técnica y datos.
No reescribir sin pedido explícito.

### Palabras prohibidas — no reintroducir en ningún lado
- **"instalación especializada" / "especialistas"** → no queremos dar a entender
  que hay especialistas. Se dice "equipos técnicos capacitados".
- **"homologación" / "homologado"** → se agrega más adelante, hoy en ningún lado.
- **"garantía"** → sacada por las dudas. Se habla de postventa y seguimiento.
- **"drenaje"** → todavía no comunicamos ese detalle.
- **"visitamos el lugar" / "nos acercamos a tu terreno"** → por las dudas. Se
  dice que asesoramos sin cargo, sin prometer visita.

### Textos cerrados
- **Nosotros (sticker):** "Los mejores materiales".
- **Nosotros (descripción):** "…proyectos de parquización que perduran en el
  tiempo. Combinamos conocimiento y los mejores materiales…".
- **Deportes (subtítulo):** "Seleccioná tu deporte de interés y conocé los
  detalles de cada uno", con negrita en "Seleccioná tu deporte" y "detalles de
  cada uno".
- **Pádel:** canchas panorámicas y full panorámicas de vidrio templado, césped
  con líneas incorporadas, estructura con los mejores materiales.
- **Tenis:** césped sintético con materiales de alto rendimiento y durabilidad.
- **Fútbol:** superficies profesionales para clubes y privados, de 5, 7, 9 y 11.
- **Rugby:** usos intensivos y la mejor absorción de impactos.
- **Hockey:** superficies de arena y de agua, todo tipo de partido, alto nivel.
- **Parquización:** el mismo césped de clubes adaptado a jardines, quinchos,
  terrazas y comercios. El gancho es chicos, mascotas y no regar.
- **Por qué elegirnos:** Alta durabilidad / Instalación / Presupuesto sin cargo.
- **Comparativa:** 4 ítems por lado. El de CESPAD cierra con postventa y
  seguimiento.
- **Proceso:** consulta = asesoramos sin costo; instalación = máximo detalle y
  cuidado.

Las negritas dentro de texto atenuado suben a blanco vía CSS
(`.section-desc strong`, `.parquizacion-desc strong`, `.parquizacion-list
strong`), si no el bold no se nota sobre el gris.

---

## 8. Qué está oculto con `[hidden]` y por qué

El contenido queda en el HTML para reactivarlo después. `[hidden]` tiene
`display: none !important`, así que no deja hueco en grids ni en flex.

| Oculto | Motivo | Para reactivar |
|---|---|---|
| Las 5 fichas técnicas de Deportes (`.deporte-specs`) | La prioridad es la foto de la cancha + la descripción breve | Sacar `hidden` y **completar los `[Ej: ...]`**, que siguen sin llenar |
| Tarjeta "Drenaje optimizado" de Por qué elegirnos | Todavía no comunicamos drenaje | Sacar `hidden`, el grid vuelve solo a 4 columnas |
| Sección Stats | Los números (15 canchas, 5 años, 98%) son de ejemplo, no reales | Sacar `hidden` **sólo con números reales de Marcelo** |
| Sección Proyectos | No hay fotos de obra todavía | Subir fotos a `img/proyectos/` y sacar `hidden` |
| Sección Testimonios | No hay testimonios reales | Ídem |
| Link "Proyectos" del nav | Acompaña a la sección oculta | Sacar `hidden` junto con la sección |

El grid de "Por qué elegirnos" usa `repeat(auto-fit, minmax(13rem, 1fr))` desde
760px y 1 columna abajo. Salta de 1 a 3 columnas sin pasar por 2, justamente
para que 3 tarjetas nunca dejen una huérfana. Verificado: con 3 visibles ocupan
el ancho completo y la cuarta pista colapsa a 0px, sin hueco, en mobile, tablet
y desktop.

---

## 9. Qué falta

### Inmediato
- **Botones de deporte.** A Sebas le gustó cómo se veían los tabs de Deportes en
  un rediseño que después se descartó entero (ver punto 11). Es lo único que
  quiere rescatar de ahí. Cambio chico y aislado: sólo los tabs, sin tocar nada
  más. **Es el próximo paso acordado.**
- **Logo.** Sebas lo está buscando/haciendo. El header ya tiene el slot: hay un
  `<a class="logo">` con el texto de marca. Cuando esté el logo, va un `<img>`
  adentro. Los logos viejos están en `img/_originales/logos/` (`Logo.png`,
  `Logo.jpg`, `logo1.jpeg`, `logo2.jpeg`) — rescatados de backups que se
  borraron, **son las únicas copias fuera del historial de git**.
- **`image.png` e `image-1.png`** en la raíz: 3MB, trackeados, no los referencia
  ningún archivo. Preguntarle a Sebas si se borran.

### Fotos pendientes (bloquean secciones enteras)
- **Fotos de obra con nombre de cliente y ciudad** para activar Proyectos. Es lo
  que más falta: hoy se puede recorrer el sitio entero sin ver una prueba de que
  la empresa instaló algo alguna vez.
- La foto de **Nosotros** (`nosotrosfoto.webp`) son paletas y pelotas de pádel
  sobre el pasto, no el equipo trabajando, aunque el `alt` diga lo contrario.
- La foto de **Parquización** (`parquizacion.webp`) es una terraza tipo bar con
  muebles verdes, no un jardín de casa de familia. Es justo la sección que
  debería hacer sentir identificado al Perfil B.
- Fotos aéreas horizontales reales de fútbol y hockey (las actuales son
  verticales rotadas). Pedirlas cuando haya obra nueva con drone.

### Bloques pendientes (en orden)
- **Bloque 3 — Carrusel Parquización.** Flecha derecha en desktop pasa a la
  siguiente foto, swipe en mobile/tablet, animación liviana.
- **Bloque 5 — Headers de seguridad** en `vercel.json` (CSP, COOP, XFO).
- **Migración a dominio propio.** Comprar `grupocespad.com.ar` en nic.ar a
  nombre de Marcelo, conectar a Vercel, verificar redirects.
- **Bloque 6 — Insumos y materiales (en definición, pausado).** Marcelo pidió
  una sección para mostrar que también venden insumos sueltos: arena de relleno,
  césped sintético sin instalación, y otros materiales. Es un **público
  distinto** al del resto del sitio (compra material, no obra llave en mano), así
  que necesita copy y CTA propios ("Consultar por insumos"), si no se mezcla el
  funnel. Tratamiento visual propuesto: catálogo compacto (una foto expositiva
  de un lado, lista de 3-4 ítems con ícono del otro, reutilizando el lenguaje
  de las tarjetas de specs), en vez de repetir el layout narrativo de
  Nosotros/Parquización. Ubicación sugerida: después de Comparativa y antes de
  Proceso, o como franja compacta antes de Contacto.
  **No arrancar sin cerrar con Marcelo:** lista real de insumos, si hay fotos,
  si se muestra precio orientativo o todo va a consulta, y qué tan grande es ese
  negocio (define si merece sección propia o una mención dentro de otra).

### No bloqueante
- CLS desktop 0.191. Si desktop pasa a ser tráfico crítico, el fix requiere
  `size-adjust` en `@font-face` o self-hosting de fuentes.
- Verificar visualmente que el swatch de tenis terracota se ve bien contra el
  verde y el azul.

---

## 10. Datos que faltan de Marcelo


- Obras reales con nombre de cliente y ciudad (aunque sean 5).
- Años de trayectoria y cantidad de canchas instaladas, reales, para Stats.
- Plazos reales de obra por tipo de proyecto.
- Datos técnicos de cada deporte para reactivar las fichas.
- Si existe o se quiere crear un programa/descuento para arquitectos.

---

## 11. Aprendizajes (leer antes de proponer rediseños)

**Hubo un intento de rediseño de identidad (llamado 4C) que Sebas rechazó
entero y se borró.** Cambiaba tipografía (Chivo en vez de Bebas), paleta,
radios, alineaciones, sacaba el marquee y reemplazaba el H1. A Sebas le pareció
**amateur** y dijo que lo prefería como lo tenía. Lo único que rescató fueron
los botones de deporte.

Qué aprender de eso:
- No cambiar muchas variables a la vez y mostrar el resultado completo. Una
  variable por vez, así se ve qué mejora y qué empeora.
- El gusto de Sebas manda sobre cualquier regla de manual de diseño.
- No aplicar recomendaciones de skills de diseño en masa. Se sintió como
  cambios "al pedo".

---

## 12. La competencia

**Atlantis Sport** — https://atlantissport.com.ar/
Se presentan como la primera fábrica de césped sintético de Argentina, +30 años.
Están consolidados y su sitio está bien hecho (Vite + Tailwind).

Lo que hacen mejor y conviene tener presente:
- Su H1 es un argumento, no un nombre: *"Césped sintético hecho por la fábrica
  que lo instala"*.
- Tienen tres números de prueba arriba de todo.
- Listan **13 obras con nombre de cliente y ciudad**. Y acá está la lección más
  útil: **sus fotos son mediocres y no importa.** Lo que vende es el "Club
  Sarmiento - San Luis" debajo de la foto. La procedencia le gana a la calidad
  de producción.
- Ponen un calificador de una pregunta en el hero, no un formulario al final.

**No copiarlos.** No se compite contra ellos en escala ni en "somos la fábrica".
Sirven como referencia de qué tan alta está la vara y de qué convenciones del
rubro conviene respetar, no como modelo a imitar.

---

Meta final: cerrar el deploy en +90 PageSpeed sin perseguir perfección infinita.
