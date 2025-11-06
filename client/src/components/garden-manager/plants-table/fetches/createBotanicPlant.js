import apiClient from "@/utils/apiClient";

export const createBotanicPlant = async (
  promptPlant,
  setAlertPlantExist,
  setDbPlants,
  setCreatingPlant,
  setSnackbar,
  setOpenModalAi,
  setPromptPlant
) => {
  if (promptPlant.name.length > 3) {
    setAlertPlantExist(false);
    setDbPlants([]);
    setCreatingPlant(true);
    await apiClient
      .post("/create-botanic-plant", { promptPlant })
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
        console.log("Raw:", dataError?.metadata.raw);
      })
      .finally(() => {
        setCreatingPlant(false);
        setOpenModalAi(false);
        setPromptPlant({
          name: "",
          variety: "",
        });
      });
  }
};
