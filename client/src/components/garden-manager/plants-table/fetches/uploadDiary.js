import apiClient from "@/utils/apiClient";

export const uploadDiary = (
  plantId,
  id,
  setIdDiary,
  imageDiary,
  inputDiary,
  refresh,
  setSnackbar
) => {
  setIdDiary(plantId);
  const formData = new FormData();
  formData.append("image", imageDiary);
  formData.append("title", inputDiary.title);
  formData.append("date", inputDiary.date);
  formData.append("content", inputDiary.content);
  const sendImageToServer = async () => {
    await apiClient
      .post(`/store-diary/${id}/${plantId}`, formData)
      .then(() => {
        refresh((prev) => !prev);
        setSnackbar({
          open: true,
          message: "Scheda inserita con successo!",
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
  sendImageToServer();
};
