import axiosInstance from "./axiosConfig";

// AI에게 내용 보내기
export const sendForm = async ({ form }) => {
  const response = await axiosInstance.post(`/send-form`, { form });
  const { status, data } = response;
  return { status, data };
};

// 보관함 저장
export const saveArchive = async ({ form }) => {
  const response = await axiosInstance.post(`/save-archive`, { form });
  const { status, data } = response;
  return { status, data };
};

// 보관함 가져오기
export const fetchForm = async () => {
  const response = await axiosInstance.get(`/get-mails`);
  const { status, data } = response;
  return { status, data };
};
