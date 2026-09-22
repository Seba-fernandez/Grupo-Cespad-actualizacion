# Sistema de diseño CESPAD

Esta carpeta es **la fuente de verdad** del sistema visual de la web.

No salió de una pizarra: salió del CSS de producción. Cada valor que está acá
está hoy en el sitio, y se auditó, se midió y se corrigió hasta que dejó de ser
un montón de decisiones sueltas.

**Para qué sirve:** cuando haya que agregar algo nuevo, esto dice qué usar. Qué
color, qué tamaño de letra, qué radio, si esa pieza flota o está hundida.

## Los tres lugares donde vive, y cuál manda

| | Qué es | Cuándo se usa |
|---|---|---|
| **Esta carpeta** | La fuente de verdad. Está en el repo, versionada en git. | Siempre. Es lo que lee cualquier sesión de Claude que abra el proyecto, y lo que se le pasa a un diseñador. |
| `../styles.css` | La implementación. Los `:root` de ahí son estos tokens. | Al escribir código. |
| [El artifact](https://claude.ai/artifact/7j4tHUo3cRS3DZTtkKnMPm) | El visor lindo, con preview en vivo de cada componente. | Para mirarlo, mostrarlo o mandárselo a alguien. |

**Si cambia un token en `styles.css`, se actualiza acá en el mismo commit.** Si
no, el sistema pasa a mentir y deja de servir para lo único que sirve. Es la
regla del punto 4 de `CONTEXTO_CLAUDE.md` y no tiene excepciones.

---

## Las cuatro reglas que hay que saber

Si sólo vas a leer una parte, que sea esta.

### 1. Un solo acento

`color-accent` (#c8f135) es el único color de marca. Aparece en el CTA, en los
íconos, en los estados activos y en los cantos encendidos. **Nada más lleva
color.** El rojo de `color-error` no es un acento: es una señal, y sólo se usa
para errores y para la columna "cancha estándar" de la Comparativa.

Si una pieza nueva necesita destacarse y el acento ya está ocupado cerca, la
respuesta no es sumar un color: es cambiar el peso o la superficie.

### 2. Sólo hay dos superficies: elevada y hundida

Esta es la distinción central y la más fácil de romper.

- **Elevada** — lo que flota. Tarjetas, tabs, botones sobre foto, paneles.
  Lleva vidrio: `backdrop-filter`, canto de luz, ruido de superficie y el
  relieve `glass-bevel` (filo arriba, espesor abajo).
- **Hundida** — lo que recibe algo. Inputs, el panel de swatches. Mismo tinte
  y mismo borde, pero el relieve va para adentro: `glass-inset`.

**No hay una tercera.** Antes había cuatro recetas de tarjeta inventadas por
separado y el sitio se sentía desarmado sin que se pudiera señalar por qué.
Si una pieza nueva parece necesitar un estado propio, casi siempre es que
todavía no se decidió si flota o recibe.

### 3. Cuatro radios, una regla

```
contenedor  →  radius-lg   (24px)   paneles, fotos, viewport del carrusel
tarjeta     →  radius-md   (16px)   tarjetas y botones
control     →  radius-sm   (8px)    inputs, tiles chicos
pastilla    →  radius-pill (999px)  badges, dots, contadores
```

Si dudás entre dos, preguntá qué es la pieza, no cuán redonda te gusta.

### 4. El ritmo no se toca

**Todas** las secciones usan `space-xl` (112px) arriba y abajo. Sin una sola
excepción, y así tiene que seguir: es lo que hace que la página se sienta de
una pieza aunque cada sección sea distinta.

Los fondos alternan entre tres: `color-bg` (#0a0a0a), `color-surface`
(#141414) y `color-pasto` (#0d130c con textura). Dos secciones seguidas nunca
comparten fondo.

---

## Jerarquía de títulos

Hay dos pesos, y la diferencia no es estética: **es de negocio.**

| | Cuándo | Secciones |
|---|---|---|
| `title-lg` (hasta 64px) | El visitante **decide** algo | Deportes, Parquización, Contacto |
| `title-sm` (hasta 48px) | El texto **argumenta** a favor de esa decisión | Nosotros, Por qué elegirnos, Comparativa, Proceso, Insumos |

Una sección nueva se ubica preguntando qué hace el visitante ahí. Si mira y
sigue, es `title-sm`.

Los dos son `clamp()`, no tamaños fijos: en mobile convergen, que es lo
correcto — en una pantalla angosta no querés 64px ni en la sección principal.

---

## Tipografía

**Bebas Neue** para display, siempre en mayúscula y con letter-spacing.
**DM Sans** para todo lo demás. Dos familias, ninguna más.

La escala tiene diez escalones y **no se sale de ahí**. Antes había 29 tamaños
sueltos, once de ellos entre 11 y 15px: diferencias que nadie distingue y que
sólo probaban que no había regla.

Los títulos de sección van aparte de la escala, a propósito: usan `clamp()`
porque ahí el tamaño es fluido por viewport.

---

## El vidrio, capa por capa

El blur solo no alcanza. Un desenfoque parejo con un borde plano de un color se
lee como *"foto borrosa detrás de un rectángulo"*, nunca como un cuerpo de
vidrio. La receta tiene cuatro capas:

1. **`glass-frost`** — ruido finísimo. Un `feTurbulence` inline como data URI,
   ~700 bytes, cero requests. Rompe el degradé perfecto que delata al blur
   digital.
2. **`glass-sheen`** — reflejo especular **concentrado** arriba a la izquierda,
   de caída corta. Una franja ancha a 135° se lee como plástico: un cristal
   refleja en un punto.
3. **`glass-rim`** — el canto. Un aro de 1.5px con degradé, hecho con
   `::before` y `mask-composite`, **porque un degradé no entra en `border`**.
   Claro arriba-izquierda, apagado al medio, un toque de lima (dispersión) y
   claro otra vez abajo-derecha. Es lo que más separa un cristal de un
   rectángulo borroso.
4. **`glass-filter`** — `blur(20px) saturate(1.7) contrast(1.12)
   brightness(0.88)`. El contraste y el brillo son los que despegan la pieza
   del fondo en vez de fundirla con él.

**El tinte es del componente, no del sistema.** El cuerpo depende de sobre qué
está apoyada la pieza: sobre foto va más denso, sobre un fondo plano más
liviano. La regla es que **se vea el fondo a través**. Si el tinte tapa, dejó de
ser vidrio y es plástico — ese era exactamente el problema de la primera
versión.

Los dos fallbacks están en producción y hacen falta:

```css
@supports not ((mask-composite: exclude) or (-webkit-mask-composite: xor)) {
  /* sin aro posible: borde plano claro */
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  /* sin vidrio: fondo sólido al 0.88–0.92 */
}
```

---

## Movimiento

Tres duraciones y nada más:

- `0.2s ease` — cambios de estado: color, borde, fondo.
- `0.4s ease` — movimiento: transform, translate, altura.
- `0.7s cubic-bezier(0.16, 1, 0.3, 1)` — apariciones al scrollear, con
  escalones de 80ms entre elementos.

Todo respeta `prefers-reduced-motion`. Lo que se anima son propiedades
compositables (`transform`, `opacity`, `translate`), nunca `width` ni `top`.

---

## Íconos

Sprite SVG inline, un solo `<defs>` con todos. Trazo 1.75, sin relleno,
`currentColor`, viewBox 24×24, puntas y esquinas redondeadas.

**Cero emojis.** Es regla dura y ya se rompió una vez: había cuatro emojis
multicolor en Contacto que eran lo más fuera de sistema de toda la página.

---

## Accesibilidad, que acá es parte del sistema

- Contraste AA verificado **midiendo el pixel real** detrás del texto, no el
  valor del token. Sobre el vidrio da 6.5:1.
- `color-text-muted` está en #9a9a9a, subido desde #868686 justamente para
  pasar AA. **No bajarlo.**
- Área táctil mínima de 44px (`tap`), sin excepciones.
- `:focus-visible` con outline de 3px en acento, en todo el sitio.
- Los inputs nunca bajan de 16px o iOS hace zoom al enfocarlos.

---

## Lo que este sistema evita a propósito

- **Un segundo color de acento.** Si algo necesita destacarse, se cambia el
  peso o la superficie.
- **Una tercera receta de superficie.** Ver la regla 2.
- **Tamaños de letra fuera de la escala.**
- **Tarjetas para todo.** Borde, relleno, radio y sombra cada uno dice "objeto
  separado". Se gastan por rol, no se estampan en todos lados. En Insumos, por
  ejemplo, las filas van dentro de un solo panel con divisorias de un pelo, no
  como seis tarjetas.
- **Numeritos 01 / 02 / 03 decorativos.** El Proceso los usa porque es una
  secuencia real; en otro lado serían relleno.

---

## Archivos

```
README.md        esto
tokens.json      los tokens, en formato legible por máquina
componentes.md   las guías de los cinco componentes
verificar.py     compara tokens.json contra los :root de styles.css
```

Una regla que nadie puede verificar se incumple sola, así que el verificador
existe para que no haga falta confiar:

```
python design-system/verificar.py
```

Sale con código 1 si encuentra una diferencia. Hoy da 39 tokens coincidiendo y
ninguno sin documentar.
