// Biblioteca de ejercicios de nivel inicial y rutinas predefinidas.

const WIKIMEDIA = (filename) => `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}`;

const DEFAULT_EXERCISES = [
  {
    id: "jumping-jacks", nombre: "Saltos de tijera (jumping jacks)", categoria: "Calentamiento", series: 2, reps: "20",
    musculo: "Piernas, hombros y core (ejercicio de cuerpo completo)",
    descripcion: "De pie, salta abriendo piernas y brazos a la vez, luego vuelve a la posición inicial. Mantén un ritmo constante.",
    imagen: WIKIMEDIA("Jumpingjacks.gif"),
  },
  {
    id: "sentadillas", nombre: "Sentadillas (peso corporal)", categoria: "Fuerza tren inferior", series: 3, reps: "12",
    musculo: "Cuádriceps, glúteos e isquiotibiales",
    descripcion: "Pies al ancho de hombros, baja la cadera como si te sentaras en una silla, espalda recta y rodillas alineadas con los pies.",
    imagen: WIKIMEDIA("Bodyweight_Squats.gif"),
  },
  {
    id: "flexiones-rodillas", nombre: "Flexiones con rodillas apoyadas", categoria: "Fuerza tren superior", series: 3, reps: "8",
    musculo: "Pecho, hombros y tríceps",
    descripcion: "Con las rodillas en el piso y manos un poco más anchas que los hombros, baja el pecho controladamente y empuja hacia arriba.",
    imagen: WIKIMEDIA("Pushups.gif"),
  },
  {
    id: "zancadas", nombre: "Zancadas (lunges)", categoria: "Fuerza tren inferior", series: 3, reps: "10 por pierna",
    musculo: "Cuádriceps y glúteos",
    descripcion: "Da un paso al frente y baja la rodilla trasera casi hasta el piso, manteniendo el torso erguido. Alterna piernas.",
    imagen: WIKIMEDIA("Lunge-CDC_strength_training_for_older_adults.gif"),
  },
  {
    id: "plancha", nombre: "Plancha abdominal", categoria: "Core", series: 3, reps: "20 seg",
    musculo: "Abdomen y espalda baja (core)",
    descripcion: "Apóyate en antebrazos y puntas de los pies, cuerpo en línea recta de cabeza a talones, sin dejar caer la cadera.",
    imagen: WIKIMEDIA("Plank.jpg"),
  },
  {
    id: "puente-gluteo", nombre: "Puente de glúteos", categoria: "Fuerza tren inferior", series: 3, reps: "15",
    musculo: "Glúteos e isquiotibiales",
    descripcion: "Acostado boca arriba, rodillas flexionadas, eleva la cadera apretando los glúteos hasta formar una línea recta con los hombros.",
    imagen: WIKIMEDIA("Glute-bridge.png"),
  },
  {
    id: "superman", nombre: "Superman (extensión de espalda)", categoria: "Core", series: 3, reps: "12",
    musculo: "Espalda baja y glúteos",
    descripcion: "Boca abajo, eleva brazos y piernas a la vez unos centímetros del piso, sostén un segundo y baja con control.",
    imagen: WIKIMEDIA("Floor_back_extensions-CDC_strength_training_for_older_adults.gif"),
  },
  {
    id: "elevacion-talones", nombre: "Elevación de talones", categoria: "Fuerza tren inferior", series: 3, reps: "15",
    musculo: "Pantorrillas",
    descripcion: "De pie, sube los talones despegándolos del piso apoyándote en las puntas de los pies, y baja con control.",
    imagen: WIKIMEDIA("Standing-calf-raises-1.gif"),
  },
  {
    id: "remo-mochila", nombre: "Remo con mochila o banda elástica", categoria: "Fuerza tren superior", series: 3, reps: "12",
    musculo: "Espalda y bíceps",
    descripcion: "Inclina el torso hacia adelante y jala el peso (mochila o banda) hacia el abdomen, apretando los omóplatos.",
    imagen: WIKIMEDIA("Bent_over_rows_with_resistance_bands_01.gif"),
  },
  {
    id: "escaladores", nombre: "Escaladores (mountain climbers)", categoria: "Cardio", series: 3, reps: "20 seg",
    musculo: "Core, hombros y piernas (cardio)",
    descripcion: "En posición de plancha alta, lleva una rodilla al pecho y alterna rápido, como si corrieras en el piso.",
    imagen: null,
  },
  {
    id: "estiramiento-isquios", nombre: "Estiramiento de isquiotibiales", categoria: "Estiramiento", series: 2, reps: "30 seg",
    musculo: "Isquiotibiales (parte de atrás del muslo)",
    descripcion: "Sentado o de pie, estira una pierna e inclínate hacia adelante desde la cadera hasta sentir el estiramiento, sin rebotar.",
    imagen: WIKIMEDIA("Hamstring_stretch-CDC_strength_training_for_older_adults.gif"),
  },
  {
    id: "estiramiento-cuadriceps", nombre: "Estiramiento de cuádriceps", categoria: "Estiramiento", series: 2, reps: "30 seg por pierna",
    musculo: "Cuádriceps (parte de adelante del muslo)",
    descripcion: "De pie, sujeta tu tobillo y lleva el talón hacia el glúteo, manteniendo las rodillas juntas y la espalda recta.",
    imagen: WIKIMEDIA("Quad_stretch-CDC_strength_training_for_older_adults.gif"),
  },
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
