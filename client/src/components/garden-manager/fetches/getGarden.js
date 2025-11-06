import apiClient from "@/utils/apiClient";

export const getGarden = async (setGarden, id) => {
  try {
    const res = await apiClient.get(`/get-garden/${id}`);
    setGarden(res.data.garden);
  } catch (err) {
    console.error("Errore completo:", err);
    const dataError = err.response?.data;
    console.error("Errore caricamento giardino:", dataError);
  }
};
