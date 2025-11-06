import apiClient from "@/utils/apiClient";

export const deleteDiary = (
  plantId,
  idDiary,
  filename,
  gardenId,
  setIdDiary,
  refresh,
  setSnackbar
) => {
  setIdDiary(plantId);
  const sendDelete = async () => {
    await apiClient
      .delete(`/delete-diary/${gardenId}/${plantId}/${idDiary}`, {
        data: { filename: filename },
      })
      .then(() => {
        refresh((prev) => !prev);
        setSnackbar({
          open: true,
          message: "Immagine eliminata con successo!",
          severity: "success",
        });
      })
      .catch((err) => {
        const dataError = err.response?.data;
        console.log("Status code:", dataError?.statusCode);
        console.log("Messaggio:", dataError?.message);
        console.log("Stack:", dataError?.stack);
      });
  };
  sendDelete();
};
