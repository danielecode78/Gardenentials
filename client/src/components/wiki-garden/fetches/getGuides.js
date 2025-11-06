import apiClient from "@/utils/apiClient";

export const getGuides = async (setGuides) => {
  await apiClient
    .get("/get-guides")
    .then((res) => {
      setGuides(res.data);
    })
    .catch((err) => {
      const dataError = err.response?.data;
      console.log("Status code:", dataError?.statusCode);
      console.log("Messaggio:", dataError?.message);
      console.log("Stack:", dataError?.stack);
      console.log("Raw:", dataError?.metadata.raw);
    });
};
