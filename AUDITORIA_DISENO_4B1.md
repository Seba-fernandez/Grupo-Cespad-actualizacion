# Auditoría de Diseño, Branding y Creatividad 4B.1 - Grupo CESPAD

Fecha: 2026-08-24
Deploy auditado: https://grupo-cespad-actualizacion.vercel.app/ (rama bloque-4b-visuales, con el sistema glass del Bloque 4B ya aplicado)
Commit: 40da51bd77ce819a034c196e3d90ec3360a74f8d
Complementa a: AUDITORIA_4B1.md (estrategia/contenido) y AUDITORIA_VISUAL_4B1.md (mediciones interactivas)
Modo: documentación y brainstorm de diseño. No se tocó código en este documento.

## Por qué este documento existe

Las dos auditorías anteriores midieron cosas objetivas: contraste real, CLS, spacing, placeholders visibles, número de WhatsApp incorrecto. Ese trabajo es necesario pero, como bien decís, es la parte de "que la web funcione bien", no la parte de "que la web venda". Este documento se enfoca en la segunda pregunta: si alguien busca "pasto sintético" en Google hoy y cae en esta web, ¿el diseño y la comunicación lo convencen de escribir, más allá de que el sitio cargue rápido y no tenga bugs?

La respuesta corta, basada en las dos pasadas anteriores: el esqueleto de diseño es sólido (tokens consistentes, spacing disciplinado, accesibilidad bien resuelta en los tabs, sin errores técnicos), pero hay tres puntos donde el contenido visual no está a la altura del esqueleto: la sección de Proyectos no existe todavía, Parquización se siente como una repetición de Nosotros en vez de una sección con personalidad propia, y el recorrido completo es una fila larga de bloques con el mismo ritmo visual (imagen+texto, imagen+texto, grid de tarjetas, imagen+texto...) sin ningún quiebre que le dé variedad a la lectura. Las tres son solucionables con creatividad de layout, no con más código de performance.

## 1. Proyectos terminados: alternativas al muro masonry

Hoy la sección está oculta porque no hay fotos reales todavía, y el markup que existe es un `masonry` de columnas de alturas variables. Entiendo por qué pensaste en masonry (es lo primero que a cualquiera se le ocurre para "muchas fotos"), pero para este caso específico creo que no es la mejor opción, y te propongo dos alternativas concretas.

### Por qué el masonry clásico no es ideal acá

Con pocas fotos (que es justamente la situación real: van a arrancar con 6 a 10 obras, no con 200), el masonry deja huecos y alturas desparejas que se leen como "todavía no hay suficiente contenido" en vez de "portfolio prolijo". Es el mismo problema que ya marcamos en la auditoría de texto como regla anti-slop: una grilla con celdas de contenido desigual lee como incompleta. Un portfolio de obras de $30-100M ARS necesita transmitir control, no un colage.

### Propuesta A - Grid de proporción fija con filtro simple (la que recomendaría empezar)

- Mismo aspect-ratio en todas las tarjetas (por ejemplo 4:3), 3 columnas en desktop, 2 en tablet, 1-2 en mobile. Cada tarjeta es foto + una línea chica debajo con el dato real (ej. "Complejo Norte - 3 canchas de pádel - Córdoba"), sin inventar el texto hasta tener los datos reales de cada obra.
- Arriba del grid, un filtro simple de 2 a 3 opciones ("Todos / Canchas / Parquización"), no hace falta reconstruir el sistema de 5 tabs de Deportes, alcanza con un filtro liviano.
- Con 6 fotos ya se ve armado a propósito, porque no depende de que las columnas calcen en altura como el masonry. Y escala sin rediseñar nada cuando sumen más obras.

### Propuesta B - Obra destacada + grid (para sumar cuando tengan 1-2 fotos realmente fuertes)

- Arriba del grid de la Propuesta A, una tarjeta grande (ancho completo o el doble de ancho que el resto) con la foto más impactante que tengan, más 2-3 datos concretos.
- Esto es exactamente lo que el Perfil A (dueño de complejo) necesita ver en los primeros 15-30 segundos según el criterio que ya usamos en la primera auditoría: una obra grande, de entrada, sin tener que buscarla scrolleando.
- No hace falta arrancar con esto. Se puede sumar el día que Marcelo elija cuál es "la" obra insignia.

Mi sugerencia: arrancar con la Propuesta A apenas haya banco de fotos mínimo (6-8), y evolucionar a la B cuando haya una obra clara para destacar.

## 2. Parquización: que deje de sentirse como una segunda "Nosotros"

Hoy Parquización usa la misma fórmula que Nosotros: foto grande de un lado, bloque de texto del otro, en 2 columnas. Aunque el contenido es distinto, el ojo lo lee como "otra sección de foto+párrafo" apenas dos bloques después de la anterior. Eso, sumado a que hoy la foto es una terraza tipo bar (no un jardín de casa), es parte de por qué esta sección no termina de convencer al Perfil B según la primera auditoría.

### Propuesta de rediseño

**Arriba: intro corta a todo el ancho, no en columna.** Eyebrow + título + una frase de gancho (no un párrafo de 3 líneas), centrado, ocupando todo el ancho del contenedor en vez de compartir la fila con la foto. Esto solo ya la distingue visualmente de Nosotros, que es 2 columnas de punta a punta.

Ejemplo de tono (a reemplazar por texto real, esto es sólo para mostrar el largo y el registro, no lo uses tal cual): "También hacemos jardines. El mismo pasto de las canchas, ahora para tu patio: verde todo el año, sin barro después de la lluvia." Corto, directo, sin adjetivos de relleno, en la voz de Marcelo.

**Abajo: franja de 3 fotos en fila, no una sola foto grande.** Cada foto con una micro-descripción abajo (una línea, no un párrafo), mostrando 3 escenarios distintos y reconocibles para el Perfil B: un jardín de casa, un quincho/patio de asado, y opcionalmente un espacio más grande (terraza o bar, si quieren mantener ese caso de uso) - pero ya no como la ÚNICA imagen de toda la sección, sino como una de tres, con las otras dos anclando la sección en "casa de familia".

Los 3 bullets que hoy existen como lista aparte ("Verde todo el año...", "Apto mascotas...", "Jardines, terrazas...") se pueden repartir como esas mismas 3 micro-descripciones debajo de cada foto, en vez de vivir como una lista de texto separada. Es la diferencia entre "te cuento 3 cosas" y "te muestro 3 cosas y te las explico en una línea cada una", que es más persuasivo y menos largo de leer.

**CTA se mantiene igual**, centrado abajo de la franja de fotos.

Con esto la sección resuelve dos problemas de una vez: deja de ser una copia estructural de Nosotros (ahora es intro ancha + franja de 3, no 2 columnas), y le da al Perfil B tres oportunidades de sentirse identificado en vez de una sola foto ambigua.

En mobile, la franja de 3 fotos puede apilarse en columna (más simple) o hacer scroll horizontal corto tipo swipe (más dinámico y ahorra alto de página); lo dejo como decisión de gusto para cuando se implemente, ambas son válidas.

## 3. Romper el scroll lineal: la firma visual que ya tienen sin saberlo

Pediste ideas para que la web no se sienta como una fila larga de secciones desconectadas. Antes de inventar algo nuevo, hay un elemento que YA existe en el sitio y que es exactamente el tipo de "sticker" que estás buscando: la tarjeta verde flotante de Nosotros (`nosotros-float-card`, la que dice "Materiales con presencia en más de 10 países" y se monta sobre el borde de la foto). Es un componente con personalidad propia, distinto a cualquier tarjeta del resto del sitio, que hoy aparece una sola vez.

### Propuesta: reutilizar esa misma tarjeta flotante en 2 o 3 lugares más

- Sobre la foto destacada de Proyectos (si se implementa la Propuesta B del punto 1): un dato corto tipo "Garantía por escrito" o el que Marcelo confirme.
- Sobre una de las 3 fotos nuevas de Parquización: por ejemplo "Apto mascotas y chicos" (si es un dato real), en vez de que viva sólo como texto de lista.

Al repetir el mismo estilo (la tarjeta verde con el ícono de check, flotando sobre el borde de una foto) en 2 o 3 puntos distintos del sitio, se convierte en una firma reconocible: el ojo la asocia con "acá hay un dato que Grupo CESPAD quiere que veas rápido", sin necesidad de inventar un componente nuevo de cero ni de romper el sistema visual que ya funciona.

### Sobre el "colocado de costado"

La sección Comparativa ya rompe el patrón vertical del resto del sitio con su layout de 2 columnas enfrentadas ("estándar vs CESPAD"). Es el mejor precedente de variedad de ritmo que el sitio ya tiene, y funciona bien. Dos ideas más en esa misma línea, para cuando haya más contenido:

- En Proyectos, en mobile específicamente, un scroll horizontal de fotos (swipe) en vez de una columna vertical larga corta la sensación de "scroll infinito" y es un gesto natural en celular para "explorar fotos".
- El Bloque 6 (ver punto 4) es una buena oportunidad para un layout que hoy no existe en el sitio: foto expositiva de un lado + lista tipo catálogo del otro (ver abajo), distinto tanto del patrón narrativo de Nosotros/Parquización como del patrón de tabs de Deportes.

## 4. Bloque 6 (futuro, en definición) - Insumos y materiales

Esto queda documentado para cuando se retome, no se implementa en este pase. Lo sumo también a `CONTEXTO_CLAUDE.md` para que no se pierda en próximas conversaciones.

### Qué pidió Marcelo

Una sección que muestre que Grupo CESPAD también vende insumos sueltos: arena para relleno de canchas, pasto sintético sin instalación, y otros materiales o accesorios del rubro.

### Por qué es una sección distinta en objetivo, no sólo en contenido

El resto del sitio vende un servicio llave en mano (instalación completa). Esta sección le habla a alguien con una intención de compra distinta: un club chico, un contratista, o alguien haciendo su propia instalación, que sólo necesita comprar el material. El copy y el CTA tienen que reflejar esa diferencia ("Consultar por insumos" en vez de "Pedí tu presupuesto de obra"). Si se mezcla con el resto del funnel, confunde a los dos públicos.

### Ubicación propuesta

Después de "Por qué elegirnos" / Comparativa y antes de "Proceso" (que sigue hablando del funnel de obra completa), o como franja compacta justo antes de "Contacto". Falta confirmar con Marcelo qué tan grande es este negocio para decidir si merece una sección completa o alcanza con una mención más chica dentro de otra sección existente.

### Tratamiento visual propuesto

En vez de copiar el layout de tabs de Deportes o el de foto+párrafo narrativo de Nosotros/Parquización, un formato tipo catálogo compacto: una foto expositiva de un lado (por ejemplo, arena embolsada y un rollo de pasto uno al lado del otro) y del otro lado una lista de 3 a 4 ítems, cada uno con ícono + nombre del insumo + una línea de descripción, reutilizando el mismo lenguaje visual compacto que ya usan las tarjetas de specs de Deportes (ícono, label corto, valor corto), no párrafos largos.

Esto la diferencia de las demás secciones por densidad y tipo de contenido (catálogo vs. relato) en vez de por un sistema de grilla completamente nuevo, que es la forma más prolija de lograr que "se sienta distinta" sin dejar de sentirse parte del mismo sitio.

### Mobile vs desktop

En desktop, foto de un lado y lista del otro, como Nosotros y Parquización. En mobile, sugiero invertir el orden que ya usan esas dos secciones: acá, la lista de ítems arriba (texto escaneable primero) y la foto abajo como cierre visual, para que no se sienta como la tercera sección seguida con el mismo patrón "foto arriba, texto abajo".

### Información que falta antes de poder implementarlo

- Lista real de insumos que vende Marcelo (arena, ¿qué tipo o granulometría?, pasto suelto ¿por metro o por rollo?, ¿qué otros accesorios: cola, grapas, cepillos?).
- Si hay fotos disponibles de esos productos, o si hay que sacarlas.
- Si conviene mostrar algún precio orientativo (ej. "desde $X el metro") o si todo va a consulta, como el resto del sitio.
- Qué tan grande es este negocio para Marcelo: si es un complemento chico o algo que quiere empujar con más fuerza, porque eso cambia si merece sección propia o un lugar más chico dentro de otra.

## 5. Qué NO tocar (reafirmando lo ya identificado)

Todo lo que ya está marcado como acierto en las dos auditorías anteriores sigue en pie y no lo tocan estas propuestas: el sistema de botones, los tabs de Deportes con su accesibilidad ARIA, el deep-link del hero, el copy de Comparativa, el formulario que arma el mensaje de WhatsApp, y el spacing entre secciones (ya confirmado disciplinado con medición real). Las propuestas de este documento suman o reordenan contenido dentro de ese mismo sistema, no lo reemplazan.

## 6. Próximos pasos sugeridos

Ninguno de estos cambios se implementa todavía. Antes de tocar código hace falta, en este orden:

1. Resolver los bloqueadores críticos ya identificados en `AUDITORIA_4B1.md` (placeholders, número de WhatsApp, fotos de Nosotros y Parquización), porque son más urgentes para la conversión de hoy que cualquier propuesta creativa nueva.
2. Definir con Marcelo los datos reales de Proyectos (fotos + datos de cada obra) para elegir entre la Propuesta A o B.
3. Conseguir o encargar las 3 fotos residenciales para la nueva franja de Parquización.
4. Cuando haya tiempo, retomar el Bloque 6 con Marcelo para cerrar la lista de información faltante del punto 4 antes de diseñarlo en código.
