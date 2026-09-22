# -*- coding: utf-8 -*-
"""
Compara design-system/tokens.json contra los :root de styles.css.

Existe porque la regla del punto 4 del contexto dice que si cambia un token en
styles.css hay que actualizarlo en el sistema, y una regla que nadie puede
verificar se incumple sola. Esto lo verifica en dos segundos.

    python design-system/verificar.py

Sale con codigo 1 si encuentra una diferencia, asi puede ir en un hook si algun
dia hace falta.
"""
import io
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Diferencias esperadas, que NO son drift:
#
# - Los accent-* se escriben en CSS como rgba(var(--accent-rgb), a) para no
#   repetir el color por todos lados. El JSON no puede guardar un var(), asi
#   que lleva el valor resuelto. Se normaliza antes de comparar.
# - color-pasto no es un token: esta escrito directo en .bg-pasto. Se documenta
#   igual porque es uno de los tres fondos de seccion, pero no vive en :root.
ACCENT_RGB = '200, 241, 53'
SIN_TOKEN = {'color-pasto': 'esta hardcodeado en .bg-pasto, no en :root'}


def normalizar(v):
    v = ' '.join(v.split())
    v = v.replace('var(--accent-rgb)', ACCENT_RGB)
    # 0.20 y 0.2 son el mismo numero
    v = re.sub(r'(\d)0+(?=[,)\s])', r'\1', v)
    return v.replace(' ', '')


def main():
    css = io.open(os.path.join(RAIZ, 'styles.css'), encoding='utf-8').read()
    root = re.search(r'^:root \{(.*?)^\}', css, re.S | re.M).group(1)
    reales = {m.group(1): m.group(2)
              for m in re.finditer(r'--([a-z0-9-]+)\s*:\s*([^;]+);', root)}

    ds = json.load(io.open(os.path.join(RAIZ, 'design-system', 'tokens.json'),
                           encoding='utf-8'))

    ok, problemas = 0, []
    for familia in ('color', 'spacing', 'radius', 'shadow', 'motion'):
        for t in ds[familia]['tokens']:
            nombre, valor = t['name'], t['value']
            if nombre in SIN_TOKEN:
                continue
            if nombre not in reales:
                problemas.append('  --%s esta en el sistema pero NO en styles.css' % nombre)
            elif normalizar(reales[nombre]) != normalizar(valor):
                problemas.append('  --%s difiere\n       sistema: %s\n       css    : %s'
                                 % (nombre, ' '.join(valor.split()),
                                    ' '.join(reales[nombre].split())))
            else:
                ok += 1

    # Al reves: tokens del CSS que el sistema no documenta.
    documentados = {t['name'] for f in ('color', 'spacing', 'radius', 'shadow', 'motion')
                    for t in ds[f]['tokens']}
    # Los glass-frost/sheen/rim/filter son gradientes y filtros: el formato de
    # tokens no los admite, se explican en prosa en el README.
    prosa = {'accent-rgb', 'font-display', 'font-body', 'reveal-delay',
             'glass-frost', 'glass-sheen', 'glass-rim', 'glass-filter',
             'title-lg', 'title-sm'}
    prosa |= {n for n in reales if n.startswith('text-')}
    sin_documentar = sorted(set(reales) - documentados - prosa)

    print('Tokens que coinciden: %d' % ok)
    if sin_documentar:
        print('\nEn styles.css pero sin documentar en el sistema:')
        for n in sin_documentar:
            print('  --%s: %s' % (n, ' '.join(reales[n].split())))
    if problemas:
        print('\nPROBLEMAS:')
        print('\n'.join(problemas))
        return 1
    if sin_documentar:
        print('\nNo hay diferencias de valor, pero faltan documentar los de arriba.')
        return 1
    print('El sistema y styles.css dicen lo mismo.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
