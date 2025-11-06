import apiClient from "@/utils/apiClient";

export const destroyGarden = async (id, setSnackbar, navigate) => {
  try {
    await apiClient.delete(`/delete-garden/${id}`);
    navigate("/gardens");
    setSnackbar({
      open: true,
      message: "Giardino eliminato con successo!",
      severity: "success",
    });
  } catch (err) {
    const dataError = err.response?.data;
    console.error("Errore eliminazione giardino:", dataError);
    setSnackbar({
      open: true,
      message: "Errore nell'eliminazione del giardino",
      severity: "error",
    });
  }
};
