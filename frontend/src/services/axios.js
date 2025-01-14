import axiosInstance from "./axiosConfig";

// 소셜 로그인 API 호출
export const socialLogin = async (socialLoginType) => {
  const response = await axiosInstance.get(`/auth/${socialLoginType}`);
  const { status, data } = response;
  console.log(data);
  return { status, data };
};

// 소셜 로그인 콜백 API 호출
export const socialLoginCallback = async ({ socialLoginType, code }) => {
  const response = await axiosInstance.get(
    `/auth/${socialLoginType}/callback`,
    {
      code,
    }
  );
  const { status, data } = response;
  console.log(data);
  return { status, data };
};

// AI에게 내용 보내기
export const sendForm = async ({ form }) => {
  const response = await axiosInstance.post(`api/generate-mail`, { form });
  const { status, data } = response;
  return { status, data };
};

// 보관함 저장
export const saveState = async ({ form }) => {
  const response = await axiosInstance.get(`/folder/save-state`, { form });
  const { status, data } = response;
  return { status, data };
};
export const saveArchive = async ({ form }) => {
  const response = await axiosInstance.post(`/folder/save`, { form });
  const { status, data } = response;
  return { status, data };
};

// 보관함 가져오기
export const fetchForm = async () => {
  const response = await axiosInstance.get(`/get-mails`);
  const { status, data } = response;
  return { status, data };
};
