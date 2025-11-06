import apiClient from "@/utils/apiClient";

export const createGuide = async (
  promptGuide,
  setGenerating,
  finallyCreateGuide
) => {
  setGenerating(true);
  await apiClient
    .post("/create-guide", { promptGuide })
    .then(() => {})
    .catch((err) => {
      const dataError = err.response?.data;
      console.log("Status code:", dataError?.statusCode);
      console.log("Messaggio:", dataError?.message);
      console.log("Stack:", dataError?.stack);
      console.log("Raw:", dataError?.metadata.raw);
    })
    .finally(() => {
      finallyCreateGuide();
    });
};
