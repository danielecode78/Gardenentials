import apiClient from "@/utils/apiClient";

export const massiveEditPlants = async (
  data,
  gardenId,
  refresh,
  setSnackbar,
  onClose,
  resetFields
) => {
  await apiClient
    .patch(`/massive-edit-plants/${gardenId}`, { data })
    .then(() => {
      refresh((prev) => !prev);
      resetFields();
      setSnackbar({
        open: true,
        message: "Piante modificate con successo!",
        severity: "success",
      });
      onClose();
    })
    .catch((err) => {
      const dataError = err.response?.data;
      console.log("Status code:", dataError?.statusCode);
      console.log("Messaggio:", dataError?.message);
      console.log("Stack:", dataError?.stack);
    });
};
