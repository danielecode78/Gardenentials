export const switchData = (
  type,
  selected,
  choice,
  oldDate,
  newDate,
  oldNote,
  newNote,
  treatments
) => {
  let field, content;
  switch (type) {
    case "concimatura":
      if (choice === "one") {
        field = "history.lastFertilized";
        content = {
          dateFertilizing: oldDate,
          noteFertilizing: oldNote,
        };
      } else if (choice === "two") {
        field = "nextActions.nextFertilization";
        content = {
          dateFertilizing: newDate,
          noteFertilizing: newNote,
        };
      }
      break;
    case "potatura":
      if (choice === "one") {
        field = "history.lastPruned";
        content = {
          datePruning: oldDate,
          notePruning: oldNote,
        };
      } else if (choice === "two") {
        field = "nextActions.nextPruning";
        content = {
          datePruning: newDate,
          notePruning: newNote,
        };
      }
      break;
    case "trattamento":
      if (choice === "one") {
        field = "history.treatments";
        content = treatments;
      } else if (choice === "two") {
        field = "nextActions.nextTreatment";
        content = {
          dateTreatment: newDate,
          noteTreatment: newNote,
        };
      }
      break;
  }

  const objToSend = {
    field,
    arrayId: selected,
    content,
  };
  return objToSend;
};
