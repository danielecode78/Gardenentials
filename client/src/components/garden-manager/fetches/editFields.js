import apiClient from "@/utils/apiClient";

export const editFields = async (editObj, id) => {
  try {
    await apiClient.patch(`/edit-fields/${id}`, { editObj });
  } catch (err) {
    console.error("Errore completo:", err);
    const dataError = err.response?.data;
    console.error("Errore caricamento giardino:", dataError);
  }
};
