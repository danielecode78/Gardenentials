import apiClient from "@/utils/apiClient";
export const fetchGardens = async (setRows) => {
  await apiClient
    .get("/gardens")
    .then((res) => {
      setRows(res.data.gardens);
    })
    .catch((err) => {
      const dataError = err.response?.data;
      console.log("Status code:", dataError?.statusCode);
      console.log("Messaggio:", dataError?.message);
      console.log("Stack:", dataError?.stack);
    });
};
