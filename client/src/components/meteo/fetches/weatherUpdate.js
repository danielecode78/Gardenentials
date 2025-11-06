import apiClient from "@/utils/apiClient";
export const weatherUpdate = async (setWeatherResponse, setSnackbar) => {
  await apiClient
    .post("/weather-update")
    .then((res) => {
      if (!res.data[0].weather) {
        return;
      }
      setWeatherResponse(res.data);
    })
    .catch((err) => {
      const dataError = err.response?.data;
      console.log("Status code:", dataError?.statusCode);
      console.log("Messaggio:", dataError?.message);
      console.log("Stack:", dataError?.stack);
    });
};
