import { editFields } from "../fetches/editFields";

export const waterClick = async (waterDiv, setIsRaining, id, refresh) => {
  if (!waterDiv.current) return;

  waterDiv.current.classList.add("watered");
  setIsRaining(true);

  setTimeout(async () => {
    waterDiv.current?.classList.remove("watered");
    setIsRaining(false);
    const newDate = new Date();
    const editObj = { field: "lastWatered", value: newDate };
    await editFields(editObj, id);
    refresh();
  }, 5000);
};
