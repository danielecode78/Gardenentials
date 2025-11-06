import apiClient from "@/utils/apiClient";

export const deleteActions = async (data, id, setSnackbar, refresh) => {
  try {
    await apiClient.patch(`/massive-edit-plants/${id}`, { data });
    setSnackbar({
      open: true,
      message: "Piante modificate con successo!",
      severity: "success",
    });
  } catch (err) {
    console.error("Errore completo:", err);
    const dataError = err.response?.data;
    console.error("Errore:", dataError);
  } finally {
    refresh();
  }
};
