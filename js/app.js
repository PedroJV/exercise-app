// Lógica de la app: estado en localStorage, navegación por pestañas y renderizado.

const STORAGE_KEYS = {
  schedule: "exerciseApp.schedule",
  customRoutines: "exerciseApp.customRoutines",
  customExercises: "exerciseApp.customExercises",
  log: "exerciseApp.log",
};

const state = {
  schedule: loadJSON(STORAGE_KEYS.schedule, DEFAULT_SCHEDULE),
  customRoutines: loadJSON(STORAGE_KEYS.customRoutines, []),
  customExercises: loadJSON(STORAGE_KEYS.customExercises, []),
  log: loadJSON(STORAGE_KEYS.log, []),
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function allExercises() {
  return [...DEFAULT_EXERCISES, ...state.customExercises];
}

function allRoutines() {
  return [...DEFAULT_ROUTINES, ...state.customRoutines];
}

function getExercise(id) {
  return allExercises().find((e) => e.id === id);
}

function getRoutine(id) {
  return allRoutines().find((r) => r.id === id);
}

function renderExerciseDetail(ex) {
  const imagen = ex.imagen
    ? `<img src="${ex.imagen}" alt="Demostración de ${ex.nombre}" loading="lazy"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
       <span class="img-fallback">Imagen no disponible por ahora.</span>`
    : `<span class="img-fallback" style="display:block">Sin imagen de referencia para este ejercicio.</span>`;

  return `
    <details class="ejercicio-detalle">
      <summary>Ver músculo trabajado y cómo hacerlo</summary>
      <div class="detalle-body">
        <div class="detalle-imagen">${imagen}</div>
        <p><strong>Músculo trabajado:</strong> ${ex.musculo || "—"}</p>
        <p><strong>Cómo hacerlo:</strong> ${ex.descripcion || "—"}</p>
      </div>
    </details>`;
}

// ---------- Navegación por pestañas ----------

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
  });
});

// ---------- Pestaña "Hoy" ----------

function renderHoy() {
  const container = document.getElementById("hoy-content");
  const hoyIdx = new Date().getDay();
  const diaNombre = DIAS_SEMANA.find((d) => d.idx === hoyIdx).nombre;
  const entry = state.schedule[hoyIdx];
  const rutina = entry ? getRoutine(entry.rutinaId) : null;

  if (!rutina || rutina.ejercicios.length === 0) {
    container.innerHTML = `
      <div class="card">
        <h2>${diaNombre}</h2>
        <p>${rutina ? "Hoy toca descanso 😌" : "No hay rutina asignada para hoy."}</p>
      </div>`;
    return;
  }

  const rows = rutina.ejercicios
    .map((exId) => getExercise(exId))
    .filter(Boolean)
    .map(
      (ex, i) => `
      <li class="ejercicio-item">
        <div class="ejercicio-item-top">
          <label class="check-label">
            <input type="checkbox" class="hoy-check" data-id="${ex.id}">
            <span><strong>${ex.nombre}</strong> — ${ex.series} series</span>
          </label>
          <input type="text" class="hoy-reps" data-id="${ex.id}" value="${ex.reps}" aria-label="Repeticiones realizadas">
        </div>
        ${renderExerciseDetail(ex)}
      </li>`
    )
    .join("");

  container.innerHTML = `
    <div class="card">
      <h2>${diaNombre} · ${rutina.nombre}</h2>
      <p class="hint">Horario programado: ${entry.horario || "sin definir"}</p>
      <ul class="ejercicio-list">${rows}</ul>
      <button id="btn-guardar-registro" class="btn-primary">Guardar registro de hoy</button>
      <p id="hoy-msg" class="msg"></p>
    </div>`;

  document.getElementById("btn-guardar-registro").addEventListener("click", () => {
    const checks = container.querySelectorAll(".hoy-check");
    const completados = [];
    checks.forEach((chk) => {
      if (chk.checked) {
        const id = chk.dataset.id;
        const reps = container.querySelector(`.hoy-reps[data-id="${id}"]`).value;
        const ex = getExercise(id);
        completados.push({ nombre: ex.nombre, series: ex.series, reps });
      }
    });

    if (completados.length === 0) {
      document.getElementById("hoy-msg").textContent = "Marca al menos un ejercicio antes de guardar.";
      return;
    }

    const now = new Date();
    state.log.unshift({
      fecha: now.toISOString().slice(0, 10),
      hora: now.toTimeString().slice(0, 5),
      rutina: rutina.nombre,
      ejercicios: completados,
    });
    save(STORAGE_KEYS.log, state.log);
    document.getElementById("hoy-msg").textContent = "¡Registro guardado! Revisa la pestaña Historial.";
    checks.forEach((c) => (c.checked = false));
    renderHistorial();
  });
}

// ---------- Pestaña "Horario" ----------

function renderHorario() {
  const container = document.getElementById("horario-content");
  const rutinas = allRoutines();

  const rows = DIAS_SEMANA.map((dia) => {
    const entry = state.schedule[dia.idx] || { rutinaId: "descanso", horario: "" };
    const options = rutinas
      .map((r) => `<option value="${r.id}" ${r.id === entry.rutinaId ? "selected" : ""}>${r.nombre}</option>`)
      .join("");
    return `
      <div class="horario-row">
        <span class="dia-label">${dia.nombre}</span>
        <select class="horario-rutina" data-dia="${dia.idx}">${options}</select>
        <input type="time" class="horario-hora" data-dia="${dia.idx}" value="${entry.horario || ""}">
      </div>`;
  }).join("");

  container.innerHTML = `${rows}<button id="btn-guardar-horario" class="btn-primary">Guardar horario</button><p id="horario-msg" class="msg"></p>`;

  document.getElementById("btn-guardar-horario").addEventListener("click", () => {
    document.querySelectorAll(".horario-rutina").forEach((sel) => {
      const dia = sel.dataset.dia;
      const hora = container.querySelector(`.horario-hora[data-dia="${dia}"]`).value;
      state.schedule[dia] = { rutinaId: sel.value, horario: hora };
    });
    save(STORAGE_KEYS.schedule, state.schedule);
    document.getElementById("horario-msg").textContent = "Horario guardado.";
    renderHoy();
  });
}

// ---------- Pestaña "Rutinas" ----------

function renderRutinas() {
  const container = document.getElementById("rutinas-content");
  const rutinas = allRoutines();

  container.innerHTML = rutinas
    .map((r) => {
      const items = r.ejercicios
        .map((id) => getExercise(id))
        .filter(Boolean)
        .map((ex) => `<li>${ex.nombre} — ${ex.series}x${ex.reps}${renderExerciseDetail(ex)}</li>`)
        .join("");
      const esPersonalizada = state.customRoutines.some((cr) => cr.id === r.id);
      return `
        <div class="card">
          <h3>${r.nombre} ${esPersonalizada ? '<span class="badge">personalizada</span>' : ""}</h3>
          ${items ? `<ul>${items}</ul>` : "<p>Día de descanso.</p>"}
          ${esPersonalizada ? `<button class="btn-secondary btn-eliminar-rutina" data-id="${r.id}">Eliminar</button>` : ""}
        </div>`;
    })
    .join("");

  container.querySelectorAll(".btn-eliminar-rutina").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.customRoutines = state.customRoutines.filter((r) => r.id !== btn.dataset.id);
      save(STORAGE_KEYS.customRoutines, state.customRoutines);
      renderRutinas();
      renderNuevaRutinaForm();
      renderHorario();
    });
  });
}

function renderNuevaRutinaForm() {
  const container = document.getElementById("nueva-rutina-ejercicios");
  container.innerHTML = allExercises()
    .map(
      (ex) => `
      <label class="check-label">
        <input type="checkbox" value="${ex.id}">
        <span>${ex.nombre} (${ex.categoria}) — ${ex.series}x${ex.reps}</span>
      </label>`
    )
    .join("");
}

document.getElementById("form-nueva-rutina").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nueva-rutina-nombre").value.trim();
  const seleccionados = [...document.querySelectorAll("#nueva-rutina-ejercicios input:checked")].map(
    (i) => i.value
  );
  if (!nombre || seleccionados.length === 0) return;

  const id = "custom-" + Date.now();
  state.customRoutines.push({ id, nombre, ejercicios: seleccionados });
  save(STORAGE_KEYS.customRoutines, state.customRoutines);

  e.target.reset();
  renderRutinas();
  renderNuevaRutinaForm();
  renderHorario();
});

document.getElementById("form-nuevo-ejercicio").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("ej-nombre").value.trim();
  const categoria = document.getElementById("ej-categoria").value;
  const series = parseInt(document.getElementById("ej-series").value, 10) || 1;
  const reps = document.getElementById("ej-reps").value.trim();
  if (!nombre || !reps) return;

  const id = "custom-ej-" + Date.now();
  state.customExercises.push({ id, nombre, categoria, series, reps });
  save(STORAGE_KEYS.customExercises, state.customExercises);

  e.target.reset();
  document.getElementById("ej-series").value = 3;
  renderNuevaRutinaForm();
});

// ---------- Pestaña "Historial" ----------

function renderHistorial() {
  const desde = document.getElementById("filtro-desde").value;
  const hasta = document.getElementById("filtro-hasta").value;

  const entradas = state.log.filter((entry) => {
    if (desde && entry.fecha < desde) return false;
    if (hasta && entry.fecha > hasta) return false;
    return true;
  });

  const resumen = document.getElementById("historial-resumen");
  const totalEjercicios = entradas.reduce((sum, e) => sum + e.ejercicios.length, 0);
  resumen.innerHTML = `<strong>${entradas.length}</strong> sesiones registradas · <strong>${totalEjercicios}</strong> ejercicios completados`;

  const container = document.getElementById("historial-content");
  if (entradas.length === 0) {
    container.innerHTML = "<p>Sin actividad registrada todavía.</p>";
    return;
  }

  container.innerHTML = entradas
    .map((entry, idx) => {
      const originalIdx = state.log.indexOf(entry);
      const items = entry.ejercicios.map((ex) => `<li>${ex.nombre} — ${ex.series}x${ex.reps}</li>`).join("");
      return `
        <div class="card">
          <div class="historial-header">
            <strong>${entry.fecha} · ${entry.hora}</strong>
            <button class="btn-eliminar-log" data-idx="${originalIdx}">Eliminar</button>
          </div>
          <p>${entry.rutina}</p>
          <ul>${items}</ul>
        </div>`;
    })
    .join("");

  container.querySelectorAll(".btn-eliminar-log").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.log.splice(Number(btn.dataset.idx), 1);
      save(STORAGE_KEYS.log, state.log);
      renderHistorial();
    });
  });
}

document.getElementById("filtro-desde").addEventListener("change", renderHistorial);
document.getElementById("filtro-hasta").addEventListener("change", renderHistorial);
document.getElementById("btn-limpiar-filtro").addEventListener("click", () => {
  document.getElementById("filtro-desde").value = "";
  document.getElementById("filtro-hasta").value = "";
  renderHistorial();
});

// ---------- Inicio ----------

renderHoy();
renderHorario();
renderRutinas();
renderNuevaRutinaForm();
renderHistorial();
