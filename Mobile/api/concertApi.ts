import api from "./api";

export const getConcert = async () => {
  const response = await api.get("/concert");
  console.log("FULL RESPONSE:", response.data);
  return response.data.data;
};
