import apiClient from "@/utils/apiClient";

export const searchBotanicPlant = async (
  query,
  setCreatingPlant,
  setDbPlants
) => {
  try {
    setCreatingPlant(true);
    const res = await apiClient.get("/search-plant", {
      params: { q: query },
    });
    setDbPlants(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  } finally {
    setCreatingPlant(false);
  }
};
