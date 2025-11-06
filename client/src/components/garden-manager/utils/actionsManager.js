import { deleteActions } from "../fetches/deleteActions";

export const funcToDo = (garden) => {
  const arrayToDo =
    garden.myPlants?.flatMap((el) => {
      const actions = [
        {
          date: el.nextActions.nextFertilization?.dateFertilizing,
          note: el.nextActions.nextFertilization?.noteFertilizing,
          type: "Concimatura",
        },
        {
          date: el.nextActions.nextPruning?.datePruning,
          note: el.nextActions.nextPruning?.notePruning,
          type: "Potatura",
        },
        {
          date: el.nextActions.nextTreatment?.dateTreatment,
          note: el.nextActions.nextTreatment?.noteTreatment,
          type: "Trattamento",
        },
      ];

      return actions
        .filter((action) => action.date && action.note)
        .map((action) => ({
          dateEvent: new Date(action.date),
          type: action.type,
          idPlant: el._id,
          name: el.name,
          note: action.note,
        }));
    }) || [];

  const mapToDo = new Map();

  arrayToDo.forEach((plant) => {
    const key = plant.dateEvent.toLocaleDateString("it-IT") + "_" + plant.type;

    if (!mapToDo.has(key)) {
      mapToDo.set(key, {
        dateEvent: plant.dateEvent,
        type: plant.type,
        plants: [],
      });
    }
    mapToDo.get(key).plants.push({
      idPlant: plant.idPlant,
      name: plant.name,
      note: plant.note,
    });
  });

  const result = Array.from(mapToDo.values());
  result.sort((a, b) => a.dateEvent - b.dateEvent);

  return result;
};

export const deleteToDoActions = (toDoToDelete, id, setSnackbar, refresh) => {
  const patchData = (el) => {
    const typeMap = {
      Concimatura: {
        field: "nextActions.nextFertilization",
        dateKey: "dateFertilizing",
        noteKey: "noteFertilizing",
      },
      Potatura: {
        field: "nextActions.nextPruning",
        dateKey: "datePruning",
        noteKey: "notePruning",
      },
      Trattamento: {
        field: "nextActions.nextTreatment",
        dateKey: "dateTreatment",
        noteKey: "noteTreatment",
      },
    };

    const configType = typeMap[el.type];
    if (!configType) {
      console.error("Tipo non riconosciuto:", el.type);
      return null;
    }

    return {
      field: configType.field,
      arrayId: el.plants.map((plant) => plant.idPlant) || null,
      content: {
        [configType.dateKey]: null,
        [configType.noteKey]: null,
      },
    };
  };

  const data = patchData(toDoToDelete);
  if (data) {
    deleteActions(data, id, setSnackbar, refresh);
  }
};
