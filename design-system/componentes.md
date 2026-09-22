# Componentes

Las guías de los cinco componentes del sistema. Los previews en vivo están en
[el artifact](https://claude.ai/artifact/7j4tHUo3cRS3DZTtkKnMPm); acá está el
criterio, que es lo que hay que leer antes de usarlos.

---

## Superficie

**Las dos únicas superficies del sistema: elevada para lo que flota, hundida
para lo que recibe algo.**

Es la distinción central y la más fácil de romper. Antes de que existiera había
cuatro recetas de tarjeta inventadas por separado —cristal con radio 16,
Comparativa sólida con radio 24, inputs con radio 8, swatches translúcidos— y
el sitio se sentía desarmado sin que se pudiera señalar por qué.

### Cuál usar

Preguntá qué hace la pieza, no cómo querés que se vea.

- **¿Flota sobre algo?** Elevada. Tarjetas, tabs, botones sobre foto, paneles,
  flechas del carrusel, íconos de deporte del hero.
- **¿Recibe algo del usuario?** Hundida. Inputs, textarea, el panel que
  contiene los swatches de color.

**No hay una tercera.** Si una pieza nueva parece necesitar un estado propio,
casi siempre es que todavía no se decidió si flota o recibe.

### Qué provee el consumidor

El canto necesita `position: relative` en la pieza y un `::before` libre. Si ese
pseudo-elemento ya está ocupado, hay que liberarlo: no hay forma de dibujar el
canto sin él.

La receta completa del vidrio está en el README.

---

## Botón

**Dos variantes y una sola receta: mismo radio, padding, cuerpo y familia en
las dos.**

### Cuál usar

- **Primario** (`btn--primary`): relleno de acento, texto casi negro. Es la
  acción principal. **Uno por sección.** Es el único elemento macizo de acento
  de toda la página, y ahí está su fuerza: si hay dos, no hay ninguno.
- **Secundario** (`btn--outline`): sólo borde. Para acciones de una sección que
  no es la de conversión, como "Consultar por cancha de pádel" dentro del panel
  de Deportes.

No hay terciario ni ghost. Si una acción no merece ninguna de las dos, es un
link, no un botón.

### Reglas

- Radio `radius-md` (16px), el mismo que las tarjetas.
- Alto mínimo `tap` (44px). No es negociable.
- Cuerpo en `text-base` (16px). El texto dice exactamente qué pasa: "Pedí tu
  presupuesto", no "Enviar".
- El hover levanta 2px y cambia el fondo. Las dos transiciones a 0.2s.
- `:focus-visible` con outline de 3px en acento viene del sistema: no hace
  falta declararlo por componente.

### El contador

Un badge opcional adentro del botón, para cuando la acción lleva una cantidad
—hoy sólo lo usa "Consultar por insumos". Va en `radius-pill`, fondo casi
negro, texto en acento, `text-2xs`.

**Lo enciende el JavaScript**: sin JS nunca aparece, y el botón sigue
funcionando con su mensaje genérico. Si lo usás, poné `aria-live="polite"` en
el elemento que anuncia el número, o un lector de pantalla no se entera de que
cambió.

---

## Tarjeta

**Contenedor de vidrio elevado, en sus dos formas: tarjeta suelta en grilla, o
panel único con filas divididas por hairlines.**

### Cuál de las dos

Esta es la decisión, y es más importante de lo que parece.

- **Tarjetas en grilla** cuando cada ítem es independiente y se compara con los
  de al lado: Por qué elegirnos, las columnas de la Comparativa.
- **Un panel con filas** cuando los ítems son una lista: Insumos, los tabs de
  Deportes en mobile.

**No estampes tarjetas en todo.** Borde, relleno, radio y sombra cada uno dice
"objeto separado", y se gastan por rol. Con seis ítems, seis tarjetas son ruido
y un panel con seis filas se lee como documento. El sitio ya tiene tres grillas
de tarjetas: una cuarta hay que justificarla.

### Radios

Tarjeta suelta `radius-md`, panel contenedor `radius-lg`, tiles y controles
adentro `radius-sm`.

### La grilla

Usá `repeat(auto-fit, minmax(13rem, 1fr))` y elegí el salto de columnas para
que **nunca quede una huérfana sola en la última fila**. La grilla de Por qué
elegirnos salta de 1 a 3 columnas sin pasar por 2, justamente por eso.

Un ítem con `[hidden]` no ocupa columna, así que apagar uno no deja hueco.

### Cantidad variable, sin JavaScript

Si la cantidad de ítems no está cerrada, resolvelo con `:has()`:

```css
.lista:has(> :nth-child(5)) { grid-template-columns: 1fr 1fr; }
.seccion:not(:has(.item))   { display: none; }
```

La segunda línea es la más útil: **la sección se oculta sola cuando no hay
ítems**, así que se puede publicar vacía y aparece cuando haya contenido. Es la
idea del `[hidden]` de Proyectos, pero automática: nadie se tiene que acordar
de encenderla.

### Qué provee el consumidor

El canto necesita `position: relative` y el `::before` libre. Si la fila lleva
un control, que el control sea real —`<input>` con su `<label>` envolviendo la
fila entera— y no un `div` con `onclick`: así el área táctil y el teclado salen
gratis.

---

## Etiqueta

**Las cuatro etiquetas del sistema, de menos a más peso.**

Todas van en mayúscula, en DM Sans, con `letter-spacing`. La diferencia es
cuánto interrumpen.

| | Qué es | Dónde |
|---|---|---|
| **Eyebrow** | Texto suelto en acento, sin fondo | Arriba de cada título de sección |
| **Pastilla** | Acento al 12% con borde al 20% | Unidad de venta en Insumos, estados |
| **Badge** | Acento macizo sobre casi negro | Una sola pieza del sitio |
| **Quieta** | Gris atenuado, sin fondo | Contador del panel de Insumos |

### El badge interrumpe: usalo una vez

Hoy lo lleva **una sola pieza**: "Nuestro estándar", en la columna premium de
la Comparativa. Ahí funciona porque es el único de la página. Si aparece un
segundo, los dos pierden. Antes de agregar uno, fijate si la pastilla no
alcanza.

### La pastilla de unidad

Es el caso más específico y vale entenderlo, porque es un buen ejemplo de cómo
un elemento chico puede cargar una idea entera.

**Nada en el sitio tiene unidades**: todo se vende por proyecto. La pastilla
"por m²" o "por tonelada" de Insumos es lo único en toda la página que dice
*"esto se compra por cantidad, no por obra"*. Separa los dos públicos de un
vistazo, sin cartel explicativo.

Si sumás una etiqueta nueva, que cargue una diferencia real como esa. Si sólo
decora, sacala.

### Medidas

- Eyebrow: `text-xs` (13px), `letter-spacing: .12em`, peso 600.
- Pastilla y quieta: `text-2xs` (12px), `letter-spacing: .07em`, peso 600.
- Badge: `text-2xs`, `letter-spacing: .12em`, peso 700.
- Todas en `radius-pill`, salvo el eyebrow y la quieta, que no llevan fondo.

**La combinación que no existe y no hay que inventar es acento sobre acento
tenue**: ahí el texto desaparece.

---

## Título de sección

**El encabezado de una sección: eyebrow, título y bajada opcional.**

Los dos pesos y cómo elegirlos están en el README (Jerarquía de títulos). Acá
va el resto.

### El eyebrow

Una línea corta arriba del título, en acento, mayúscula, `text-xs` con
`letter-spacing: .12em`.

Tiene que ser una **etiqueta o una afirmación corta**, no una frase. Y ojo con
un tic que ya apareció: cuatro de nueve empiezan con "Nuestro/a". Si el que
estás escribiendo también, buscá otra entrada.

### La bajada

`text-lg` (17px) en `color-text-muted`, ancho máximo ~52 caracteres.

Las negritas suben a `color-text` por CSS. **Hace falta declararlo**: si no, el
bold queda del mismo gris y no se nota. Los selectores están agrupados en
`styles.css` — sumá el tuyo ahí cuando crees una sección nueva.

Van **una o dos negritas por párrafo, sobre lo que sirve para escanear**. Tres
ya es subrayar todo.

### Alineación

Centrado por defecto. Al ras izquierdo sólo cuando la sección es a dos
columnas, como Parquización e Insumos: ahí centrar se ve peor.
