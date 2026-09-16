# Rutinas en Casa 🏠💪

Aplicación web simple para seguir rutinas de ejercicio en casa de **nivel inicial**, con número de repeticiones por ejercicio, horario semanal y registro de actividades.

No requiere instalación, backend ni conexión a internet: es HTML/CSS/JS puro y guarda todo en el `localStorage` del navegador.

## Funcionalidades

- **Hoy**: muestra la rutina programada para el día actual (según el horario semanal), con series y repeticiones de cada ejercicio. Permite marcar los ejercicios realizados y guardar el registro con fecha y hora.
- **Horario**: asigna una rutina y un horario a cada día de la semana (lunes a domingo).
- **Rutinas**: biblioteca de ejercicios de nivel inicial (calentamiento, fuerza, core, cardio, estiramiento) organizados en rutinas predefinidas. Permite crear rutinas personalizadas y agregar ejercicios nuevos a la biblioteca.
- **Historial**: registro de todas las sesiones completadas (fecha, hora, rutina y ejercicios), con filtro por rango de fechas.

## Rutinas incluidas

| Rutina | Enfoque |
|---|---|
| Cuerpo completo | Fuerza general (piernas, core, glúteos) |
| Cardio suave | Movimiento cardiovascular de bajo impacto |
| Estiramiento y movilidad | Flexibilidad y recuperación |
| Descanso | Día libre |

## Cómo usarla

1. Abre `index.html` en cualquier navegador (o publícalo con GitHub Pages).
2. Ve a la pestaña **Horario** para ajustar los días/horarios a tu rutina.
3. Cada día, entra a **Hoy**, marca lo que completes y guarda el registro.
4. Revisa tu progreso en **Historial**.

## Estructura del proyecto

```
index.html      # estructura de la app y pestañas
css/style.css   # estilos
js/data.js      # biblioteca de ejercicios y rutinas por defecto
js/app.js       # lógica de la app (estado, render, localStorage)
```

## Publicar con GitHub Pages (opcional)

En este repositorio: **Settings → Pages → Deploy from branch → main / (root)**.
