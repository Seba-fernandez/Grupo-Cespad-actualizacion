# Handoff — sesión del 20 al 22 de septiembre de 2026

Este archivo es el registro de **una sesión de trabajo**: qué se hizo, por qué,
y qué quedó a medias. No reemplaza a `CONTEXTO_CLAUDE.md`, que sigue siendo el
archivo que hay que leer para retomar el proyecto desde cero.

- **El estado del proyecto** → `CONTEXTO_CLAUDE.md`
- **Qué usar al agregar algo nuevo** → el sistema de diseño (link abajo)
- **Qué pasó en esta sesión y por qué** → este archivo

---

## 1. Dónde está todo parado

| | |
|---|---|
| Producción (`main`) | https://grupo-cespad-actualizacion.vercel.app/ |
| Repo | https://github.com/Seba-fernandez/Grupo-Cespad-actualizacion |
| Sistema de diseño | https://claude.ai/artifact/7j4tHUo3cRS3DZTtkKnMPm (privado) |
| Diseño de Insumos (Claude Design) | https://claude.ai/artifact/E2KyTd5CxJcSyHNtvnUvSH |

**Ramas vivas:**

- `main` — todo lo mergeado. Es lo que está publicado.
- `bloque-6-insumos` — la sección Insumos, **sin mergear a propósito**. Sebas
  quiere verla funcionando antes de publicarla.
- `bloque-4-deportes` — vieja, ya contenida en `main`. Se puede borrar.

---

## 2. Lo que entró a producción esta sesión

Siete commits, en este orden.

### Bloque 3 — Carrusel de Parquización

La foto fija pasó a carrusel. Flechas en desktop (ocultas abajo de 1024px),
swipe de dedo en mobile con **resistencia de 1/3 en las puntas**, dots como
indicador. Sin loop: en la primera y la última la flecha se deshabilita.

Dos decisiones que importan:

- El alto del viewport es la **misma `clamp(17rem, 62vw, 26rem)`** que tenía la
  foto, así que el layout no se movió un píxel al sumar el carrusel.
- El swipe sólo escucha punteros que **no sean mouse**. Con mouse ya están las
  flechas, y escucharlo ahí pelearía con el arrastre nativo de la imagen.

**Sumar una foto es un `<li>` más.** Los dots los arma `main.js` según la
cantidad de slides; con una sola hace early-return y vuelve a ser foto fija.

También se reemplazaron `tenis-verde.webp` y `tenis-azul.webp` por versiones
nuevas a 1200×617. Antes medían 586 y 583, o sea que el swatch producía un
saltito al cambiar de color.

### Bloque 4B.2 — Cristal en vez de blur genérico

El glass anterior se leía como *"foto borrosa detrás de un rectángulo"*. Un
blur parejo con un borde plano de un solo color nunca se lee como un cuerpo de
vidrio. Se reemplazó por una receta de cristal, en tokens de `:root`:

| Token | Qué hace |
|---|---|
| `--glass-frost` | Ruido finísimo (`feTurbulence` inline, ~700 bytes, 0 requests). Rompe el degradé perfecto que delata al blur digital. |
| `--glass-sheen` | Reflejo especular **concentrado** arriba-izquierda, de caída corta. La franja ancha a 135° anterior se leía como plástico: un cristal refleja en un punto, no en una banda. |
| `--glass-rim` | El canto. Lo pinta un `::before` con `mask-composite`, porque **un degradé no entra en `border`**. Claro arriba-izq, apagado al medio, un toque de lima (dispersión) y claro otra vez abajo-der. |
| `--glass-filter` | `blur(20px) saturate(1.7) contrast(1.12) brightness(0.88)`. El contraste y el brillo son los que **despegan la pieza del fondo** en vez de fundirla con él. |
| `--glass-bevel` | Filo de luz arriba, espesor abajo. |

**Lo que más movió la aguja no fue ninguna de esas capas: fue bajar el tinte.**
Con el tinte denso anterior no se veía nada a través del vidrio, que era el
problema de fondo. Ahora los íconos del hero toman el color del panel que
tienen atrás —rojo en tenis, azul en hockey— y se leen como lentes, no como
discos opacos.

Piezas alcanzadas: íconos de deporte del hero, contenedor de tabs en mobile,
cada tab en desktop, tarjetas de Por qué elegirnos, flechas del carrusel y el
panel de Deportes (su canto va al 55% para que los tabs le ganen en brillo).

Detalles de implementación que no se ven pero importan:

- El filo verde del tab activo pasó de `border-left` a `inset box-shadow`,
  porque el borde ahora es el canto. Se ve igual y no descuadra el padding.
- Las flechas del carrusel llevan tinte más denso que el resto: son controles
  sobre foto de brillo impredecible, y ahí **la lectura le gana a la
  transparencia**.
- Fallbacks `@supports` para navegadores sin `mask-composite` (borde plano) y
  sin `backdrop-filter` (fondo sólido), en las dos hojas.

### Pasada de redacción

Sin sumar un dato ni una promesa. Se reescribió **cómo está dicho**:

- Cuatro de las cinco descripciones de deporte abrían con "Superficies".
- El H2 de Nosotros era un par cliché ("Pasión por el detalle, obsesión por la
  calidad") → **"El detalle es lo que dura."**
- "Materiales premium" salió por adjetivo vacío y se reemplazó por la propiedad
  física: *"Mantiene altura, color y pisada temporada tras temporada."*
- Parquización decía tres veces lo mismo entre H2, descripción y viñetas.
- **Comparativa no se tocó.** Sigue siendo la referencia de tono del sitio.

Hizo falta sumar `.nosotros-desc strong`, `.por-que-desc strong` y
`.contacto-desc strong` a la regla que sube las negritas a blanco; si no, el
bold nuevo no se notaba sobre el gris atenuado.

### Bloque 7 — Consistencia

Cerró los tres hallazgos más fuertes de la auditoría (punto 9b del contexto).

**Escala tipográfica en tokens.** 39 declaraciones pasaron a `--text-*`, diez
escalones. Antes había **29 tamaños sueltos en 47 declaraciones** y ni un token
tipográfico, mientras color, espaciado, radios, sombras y transiciones sí los
tenían. Once de esos valores caían entre 0.7rem y 0.95rem: diferencias que el
ojo no distingue pero que probaban que no había regla.

El cambio visual máximo fue **+1.6px** en `.por-que-title`, que ahora comparte
tamaño con `.proceso-step-title` — los dos son títulos de tarjeta en Bebas y
medían distinto sin razón.

**De cuatro lenguajes de tarjeta a dos estados de superficie.** Había cristal
(radio 16), Comparativa sólida (radio 24), inputs (radio 8) y swatches
(translúcido sin vidrio, radio 16). Cuatro recetas inventadas por separado: eso
era lo que hacía que el sitio se sintiera desarmado sin que se pudiera señalar
por qué.

Ahora el sistema distingue **ELEVADA** (`--glass-bevel` + canto +
`backdrop-filter`) de **HUNDIDA** (`--glass-inset`, token nuevo). Y una regla
de radios que se dice en una línea: contenedor `lg`, tarjeta `md`, control
`sm`, pastilla `pill`.

**Cero emojis en el markup.** Los cuatro de Contacto (📞 📍 🚗 ⏱) eran
multicolor sobre una marca de dos colores: lo más fuera de sistema que tenía la
página. Pasaron a cinco símbolos nuevos del sprite.

### Bloque 8 — Jerarquía y corrección de claims

**"Equipo propio" fuera de todo el sitio.** Los equipos de instalación no son
propios y estaba afirmado en dos lugares. Había un problema peor, de **efecto
espejo**: la columna "cancha estándar" de la Comparativa le reprochaba a la
competencia la instalación tercerizada. Si nosotros también tercerizamos, ese
reproche vuelve. Ese ítem ahora apunta al **control**, que es el diferencial
que sí se puede sostener.

**Dos pesos de título.** Los nueve H2 medían 64px y Deportes —que es el
funnel— gritaba igual que Proceso. Ahora `--title-lg` (hasta 64px) para las
secciones donde el visitante **decide** algo, y `--title-sm` (hasta 48px) para
las que **argumentan** a favor de esa decisión. La jerarquía visual espeja la
del negocio, no al revés.

**Titular de Deportes.** El H2 enumeraba los cinco deportes y se comía dos
renglones. Los nombres ya están en los tabs, los H3, el subtítulo del hero, el
marquee y el JSON-LD, así que sacarlos no cuesta SEO. Quedó *"Deporte por
deporte"* + **"Cada uno pide una cancha distinta"**: un argumento en un
renglón, que además explica por qué hay cinco construcciones distintas.

### Bloque 5 — Headers de seguridad

`vercel.json` con CSP, XFO, COOP, CORP, nosniff, Referrer-Policy,
Permissions-Policy y HSTS.

**El CSP es lo único del proyecto que puede tumbar el sitio entero sin que
nadie se dé cuenta**, así que se probó en navegador inyectándolo como `<meta>`
antes de deployarlo. El primer intento falló, y falló feo. Ver la sección de
trampas más abajo.

### Fix del hero + og-image

- **Se sacaron las líneas negras diagonales** del hero: eran
  `.sport-panel::after`, una barra de 5px con `transform: skewX(-9deg)` puesta
  como "separador diagonal entre paneles". Iba en `styles.css` **y** en el CSS
  crítico inline: sacarla de uno solo las hacía volver al cargar.
- El subtítulo del hero decía "Fútbol, pádel, tenis…" pero los paneles van
  pádel, tenis, fútbol, rugby, hockey. Ahora el texto sigue el orden de las
  fotos.
- La imagen que subió Sebas como "favicon" era 1600×900 con logo y texto: es
  una imagen de compartir, no un favicon (a 32px queda una mancha). Pasó a
  `og-image.jpg`, 1200×675 JPEG progresivo q82, **108 KB**. Se mantiene en JPG
  porque WhatsApp y Facebook no leen webp de forma confiable.

---

## 3. Lo que se trabajó con Design

### La sección Insumos (rama `bloque-6-insumos`, sin mergear)

El problema no era "falta una sección". Era que **una misma página tiene que
atender dos compras que no se parecen en nada**: obra llave en mano (un
resultado terminado) y material suelto (materia prima, por cantidad).

Hubo dos propuestas:

1. **La de esta sesión** (`DISENO_BLOQUE6_INSUMOS.md`): cambiar de registro, de
   fotografía a especificación. Panel de vidrio con filas en vez de tarjetas,
   pastilla de unidad de venta, auto-ocultado con `:has()`.
2. **La que armó Sebas aparte con Claude Design** (link arriba). **Resolvió
   mejor la parte que más importaba.**

Lo que trajo la de Claude Design y la otra no tenía:

- **La lista no muestra: registra.** Cada fila tiene una casilla y lo marcado
  arma el mensaje de WhatsApp. Convierte la sección de vidriera en herramienta,
  y engancha con el módulo que ya existía para el formulario.
- **Salida explícita al funnel de obra** (*"¿Buscás la obra completa? Pedí tu
  presupuesto"*). Resuelve el problema de los dos públicos mejor que la
  ubicación y el peso visual solos: el que cayó ahí por error vuelve sin
  scrollear.
- *"También podés escribirnos sin marcar nada"*, para que la casilla no se lea
  como obligatoria.
- *"¿No está en la lista? Escribinos qué necesitás"* en el pie. Cubre el
  catálogo incompleto, que es justo el estado del negocio.

De la primera propuesta sobrevivieron el planteo del problema, la ubicación
entre Proceso y Contacto, el `--title-sm`, el fondo `bg-pasto`, el panel con
filas y la pastilla de unidad.

Lo que se agregó al implementarlo:

- La casilla es un `<input type="checkbox">` **real**, oculto visualmente pero
  operativo, con el `<label>` envolviendo **toda la fila**: 145px de área táctil
  en mobile y navegación por teclado gratis.
- `aria-live="polite"` en el contador.
- **Sin JavaScript la sección sigue sirviendo**: el CTA ya trae un `href`
  válido del módulo 08 y el JS sólo lo reescribe cuando hay algo marcado.
- Se oculta sola cuando no hay ningún insumo (`:has()`), así que **se puede
  publicar vacía**.

**Falta para darla por cerrada:** la lista real de Marcelo, y sobre todo **la
unidad de venta de cada material** (hoy dice `[unidad de venta]` y es lo que
sostiene todo el concepto).

**Idea abierta para mañana:** un botón "Materiales para encargar" bien llamativo
que lleve a una **página aparte** dedicada al catálogo, en vez de una sección.
Resuelve los dos funnels de raíz.

### El sistema de diseño

https://claude.ai/artifact/7j4tHUo3cRS3DZTtkKnMPm — **privado**, sólo lo abre
Sebas hasta que lo comparta desde el menú Share.

No se inventó: **salió del CSS de producción**. Cada valor que está ahí está
hoy en el sitio. Tiene los tokens completos con nota de uso en cada uno, un
README con las reglas, y cinco componentes con preview en vivo: Superficie,
Botón, Tarjeta, Etiqueta y TítuloSección.

Las cuatro reglas que resume:

1. **Un solo acento.** Si algo necesita destacarse y el acento ya está cerca,
   se cambia el peso o la superficie, no se suma un color.
2. **Sólo dos superficies:** elevada (flota) y hundida (recibe algo). No hay
   una tercera.
3. **Cuatro radios:** contenedor `lg`, tarjeta `md`, control `sm`, pastilla
   `pill`.
4. **El ritmo no se toca:** `space-xl` (112px) arriba y abajo en todas las
   secciones, sin excepción.

**Si cambia un token en `styles.css`, hay que actualizarlo ahí también**, o el
sistema pasa a mentir y deja de servir.

---

## 4. Performance — qué se midió de verdad

Hay que ser preciso con esto porque es fácil atribuirle mérito a lo que no
corresponde.

**92 mobile / 90 desktop es el número de los bloques 1 y 2A-2D**, que son
anteriores a esta sesión. Esa optimización bajó el payload de 12.6 MB a ~3 MB
con recompresión a WebP, CSS crítico inline, preload del LCP y las dos woff2,
`content-visibility` y `width`/`height` reales en cada `<img>`.

**Lo que esta sesión aporta es que todo el trabajo visual entró sin gastar ese
presupuesto:**

- El sistema de cristal no suma un solo request: el ruido es un
  `feTurbulence` inline de ~700 bytes y el canto es CSS puro.
- El carrusel no suma JS de librería: son ~110 líneas de vanilla.
- La sección Insumos suma **0 KB de imágenes** en su estado por defecto.
- La escala tipográfica y la unificación de superficies son puro renombrado de
  valores: cero peso.
- El Bloque 5 sacó el último `<script>` inline que quedaba.

**Medición local, con el sitio servido desde el proyecto:**

| | FCP / LCP |
|---|---|
| Antes del Bloque 7 | 476 ms |
| Después del Bloque 7 | 432 ms |
| Después del Bloque 5 (con CSP) | sin regresión |

**Importante y honesto: no hay un PageSpeed medido después de estos cambios.**
Sebas mencionó que iba a mandar el informe pero nunca llegó al chat. El 92/90
sigue siendo el número viejo, y **habría que volver a correr PageSpeed contra
producción** ahora que está todo mergeado. El CLS de desktop, 0.191, tampoco se
volvió a medir.

---

## 5. Auditoría UX/UI: 3.6 → 4.5 / 5

Hecha con el sitio corriendo y midiendo, no a ojo. El detalle completo está en
el punto 9b del contexto.

**Lo que ya estaba bien:** ritmo vertical de 112px en las nueve secciones sin
excepción, 32 de 32 transiciones desde tokens, una sola receta de botón, tres
superficies de fondo alternadas, y contraste AA verificado **midiendo el pixel
real** detrás del texto (6.5:1 sobre el vidrio nuevo).

**Lo que se arregló:** tipografía sin tokens, cuatro lenguajes de tarjeta, los
emojis, los radios fuera de token y la falta de jerarquía entre secciones.

**Lo que sigue abierto**, y no se tocó porque son decisiones de diseño o de
negocio, no de consistencia:

1. **El H1 es un nombre, no un argumento.** El `<h1>` real mide 32px y lo que
   domina la pantalla es "GRUPO CESPAD" a 160px. Atlantis titula *"Césped
   sintético hecho por la fábrica que lo instala"*. El hero está en la lista de
   intocables, así que queda reportado, no propuesto.
2. **Formulario de 7 campos, 4 obligatorios**, para terminar abriendo un chat
   de WhatsApp. Cuántos datos vale perder un lead lo decide Marcelo.
3. **Espaciado:** los tokens `--space-*` existen pero los componentes usan ~20
   valores crudos. Misma deuda que tenía la tipografía, pero se nota mucho
   menos porque el ritmo entre secciones sí está tokenizado.
4. **Eyebrows con registro mezclado:** cuatro de nueve arrancan con "Nuestro/a".

---

## 6. Trampas — leer antes de tocar

### El CSP se rompe en silencio

`vercel.json` lleva **dos hashes** en `script-src`:

```
'sha256-MhtPZXr7+LpJUY5qtMutB+qWfQtMaPccfe7QXtCcEYc='   → onload="this.media='all'"
'sha256-F1noxsLOnJhyRSgc0zu5JgzoLjG2BBMaXaSG24k2mRM='   → onload="this.rel='stylesheet'"
```

Esos dos `onload` del `<head>` son los que **cargan el CSS diferido**. El primer
CSP los bloqueó y la página quedaba sin estilos abajo del fold: Vercel deploya
feliz y el sitio se ve roto.

**Si cambiás el texto de uno de esos dos atributos, hay que recalcular su hash
o el sitio se rompe.** Para probar un CSP antes de deployarlo: inyectarlo como
`<meta http-equiv="Content-Security-Policy">` en una copia local y mirar la
consola.

`style-src` sí lleva `'unsafe-inline'` y no hay forma de evitarlo: los swatches
pasan su textura por atributo `style="--swatch: url(...)"` y los hashes no
aplican a atributos `style`. Es un riesgo mucho menor que el de `script-src`.

### El CSS crítico inline duplica reglas a propósito

`index.html` tiene un bloque `<style>` en el `<head>` que repite reglas del
header y del hero que también están en `styles.css`. **Si tocás una, tocá la
otra.** Ya pasó dos veces en esta sesión: con los íconos del hero y con las
líneas diagonales.

### Nada de `Cache-Control` inmutable en `/img/`

Se evaluó y se descartó a propósito: Sebas reemplaza fotos conservando el
nombre (pasó con las de tenis), y con un año de caché nadie vería la nueva.

### `.gitattributes` fija LF

Sin eso Windows mete CRLF y cualquier cosa que dependa del contenido exacto —un
hash de CSP, un diff limpio— se rompe sin avisar. Pasó dos veces antes de
agregarlo.

### Al mergear `bloque-6-insumos` vuelve un archivo muerto

El merge sale **limpio, sin conflictos** (verificado con `git merge-tree`),
pero `img/favicon-oficial.jpeg` (162 KB) **resucita**: la rama todavía lo tiene
y `main` lo borró después de que la rama se separó.

Después de mergear, borrarlo a mano:

```bash
git rm img/favicon-oficial.jpeg
git commit -m "chore: sacar el jpeg suelto que revivio el merge"
```

---

## 7. Lo que sigue

### Inmediato

- **Correr PageSpeed contra producción.** Es el dato que falta.
- **Favicon.** Necesita una marca **cuadrada** que se lea a 32px: un escudo,
  una C, un isotipo sin texto al lado. Hay cuatro logos viejos en
  `img/_originales/logos/` por si alguno sirve recortado.
- **Dominio.** Sebas lo iba a pagar. Al conectarlo a Vercel hay que actualizar
  las URLs absolutas del JSON-LD y del `og:url` en `index.html`, el link del
  README, y verificar el HSTS mientras propaga el DNS.
- **Insumos:** la lista real y la unidad de venta de cada material.

### Bloques pendientes

- **Página aparte para el catálogo de materiales**, con botón llamativo desde
  la home (idea nueva, reemplazaría o complementaría a la sección actual).
- Fotos de obra reales con nombre de cliente y ciudad. Es lo que más falta:
  hoy se puede recorrer el sitio entero sin ver una prueba de que la empresa
  instaló algo. Atlantis lista 13 obras con **fotos mediocres** y le alcanza —
  la procedencia le gana a la calidad de producción.
- Foto de un jardín residencial real para Parquización (las dos actuales son
  una terraza comercial y un patio institucional).

### Limpieza pendiente

- `image.png` e `image-1.png` en la raíz: 3 MB trackeados que no referencia
  ningún archivo. Hay que preguntarle a Sebas si se borran.
- `parquizacion-1.webp` es byte a byte idéntica a `parquizacion.webp`.
- La rama `bloque-4-deportes` ya está contenida en `main`.
