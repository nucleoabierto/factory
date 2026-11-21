# Verificación de la instalación por conjunto

## Tipo

mantenimiento

## Objetivo

Verificar la garantía de coherencia de forma ejecutable: instalar cada subpaquete por separado en un proyecto de prueba y comprobar que sus piezas se resuelven y operan sin el resto de la colección.

## Dependencias

- Borrador 03

## Entrada

- La colección materializada y adaptada: los paquetes con sus piezas.
- El instalador teleprompter disponible en el entorno y un repositorio de prueba desechable por conjunto.

## Resultado esperado

- Un informe de verificación por conjunto: instalación limpia del paquete, piezas resueltas en el destino y operación básica ejercitada —cada skill del conjunto se invoca sin referencias rotas—.
- La misma verificación sobre la colección completa instalada como antes, para detectar regresiones de la reestructuración.
- Los defectos encontrados, corregidos o devueltos al modelo con su evidencia.

## Criterios de calidad

- Cada paquete instala sin errores en un repositorio limpio.
- Ninguna pieza instalada referencia material o capacidades ausentes: las referencias `../` resuelven dentro de lo instalado.
- La colección completa sigue instalando igual que el paquete único anterior: mismo conjunto de skills en el destino.

## Procedimiento sugerido

1. Por cada paquete, instalar en un repositorio de prueba limpio y verificar el mapa de instalación completo.
2. Ejercitar la operación básica de cada pieza instalada y comprobar que ninguna referencia queda rota.
3. Instalar la colección entera y comparar el resultado contra la instalación del paquete único previo.
4. Registrar defectos: los de frontera se resuelven en la pieza correspondiente o se devuelven al modelo con evidencia.
