import api from "../../../services/api";

export const sendContact = async (payload) => {
  const res = await api.post("/contact", payload);
  return res.data;
};