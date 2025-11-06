import apiClient from "@/utils/apiClient";

export const createEditMyPlant = async (
  editObj,
  idPlant,
  setSnackbar,
  isNew,
  id,
  idToEdit
) => {
  editObj.value.plant = idPlant;
  if (isNew) {
    await apiClient
      .post(`/add-myplants/${id}`, { editObj })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Pianta inserita con successo!",
          severity: "success",
        });
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
      });
  } else {
    await apiClient
      .patch(`/edit-plant/${id}/${idToEdit}`, { editObj })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Pianta modificata con successo!",
          severity: "success",
        });
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
      });
  }
};
