// Biblioteca de ejercicios de nivel inicial y rutinas predefinidas.

const DEFAULT_EXERCISES = [
  { id: "jumping-jacks", nombre: "Saltos de tijera (jumping jacks)", categoria: "Calentamiento", series: 2, reps: "20" },
  { id: "sentadillas", nombre: "Sentadillas (peso corporal)", categoria: "Fuerza tren inferior", series: 3, reps: "12" },
  { id: "flexiones-rodillas", nombre: "Flexiones con rodillas apoyadas", categoria: "Fuerza tren superior", series: 3, reps: "8" },
  { id: "zancadas", nombre: "Zancadas (lunges)", categoria: "Fuerza tren inferior", series: 3, reps: "10 por pierna" },
  { id: "plancha", nombre: "Plancha abdominal", categoria: "Core", series: 3, reps: "20 seg" },
  { id: "puente-gluteo", nombre: "Puente de glúteos", categoria: "Fuerza tren inferior", series: 3, reps: "15" },
  { id: "superman", nombre: "Superman (extensión de espalda)", categoria: "Core", series: 3, reps: "12" },
  { id: "elevacion-talones", nombre: "Elevación de talones", categoria: "Fuerza tren inferior", series: 3, reps: "15" },
  { id: "remo-mochila", nombre: "Remo con mochila o banda elástica", categoria: "Fuerza tren superior", series: 3, reps: "12" },
  { id: "escaladores", nombre: "Escaladores (mountain climbers)", categoria: "Cardio", series: 3, reps: "20 seg" },
  { id: "estiramiento-isquios", nombre: "Estiramiento de isquiotibiales", categoria: "Estiramiento", series: 2, reps: "30 seg" },
  { id: "estiramiento-cuadriceps", nombre: "Estiramiento de cuádriceps", categoria: "Estiramiento", series: 2, reps: "30 seg por pierna" },
];

const DEFAULT_ROUTINES = [
  {
    id: "full-body",
    nombre: "Cuerpo completo",
    ejercicios: ["jumping-jacks", "sentadillas", "flexiones-rodillas", "zancadas", "puente-gluteo", "plancha"],
  },
  {
    id: "cardio-suave",
    nombre: "Cardio suave",
    ejercicios: ["jumping-jacks", "escaladores", "zancadas", "elevacion-talones"],
  },
  {
    id: "movilidad",
    nombre: "Estiramiento y movilidad",
    ejercicios: ["estiramiento-isquios", "estiramiento-cuadriceps", "superman", "plancha"],
  },
  {
    id: "descanso",
    nombre: "Descanso",
    ejercicios: [],
  },
];

const DEFAULT_SCHEDULE = {
  1: { rutinaId: "full-body", horario: "07:00" },   // Lunes
  2: { rutinaId: "cardio-suave", horario: "07:00" }, // Martes
  3: { rutinaId: "full-body", horario: "07:00" },    // Miércoles
  4: { rutinaId: "cardio-suave", horario: "07:00" }, // Jueves
  5: { rutinaId: "full-body", horario: "07:00" },    // Viernes
  6: { rutinaId: "movilidad", horario: "09:00" },    // Sábado
  0: { rutinaId: "descanso", horario: "" },          // Domingo
};

const DIAS_SEMANA = [
  { idx: 1, nombre: "Lunes" },
  { idx: 2, nombre: "Martes" },
  { idx: 3, nombre: "Miércoles" },
  { idx: 4, nombre: "Jueves" },
  { idx: 5, nombre: "Viernes" },
  { idx: 6, nombre: "Sábado" },
  { idx: 0, nombre: "Domingo" },
];
