import apiClient from "@/utils/apiClient";

export const deletePlants = async (
  id,
  selected,
  setConfirmModal,
  refresh,
  setSnackbar
) => {
  await apiClient
    .delete(`/delete-plant/${id}`, { data: { selected } })
    .then(() => {
      setConfirmModal(false);
      refresh((prev) => !prev);
      setSnackbar({
        open: true,
        message: "Piante eliminate con successo!",
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
