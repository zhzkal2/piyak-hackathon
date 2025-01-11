import axiosInstance from "./axiosConfig";

export const sendForm = async ({ form }) => {
  const response = await axiosInstance.post(`/send-form`, { form });
  const { status, data } = response;
  return { status, data };
};
