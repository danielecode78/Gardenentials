import apiClient from "@/utils/apiClient";
export const weatherRequest = async (setWeatherResponse, setSnackbar) => {
  await apiClient
    .get("/weather-request")
    .then((res) => {
      setWeatherResponse(res.data);
      setSnackbar({
        open: true,
        message: "Dati meteo caricati con successo!",
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
