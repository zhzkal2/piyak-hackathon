import axiosInstance from "./axiosConfig";
import React, { useState } from 'react';

// 소셜 로그인 API 호출
export const socialLogin = async (socialLoginType) => {
  const response = await axiosInstance.get(`/auth/${socialLoginType}`);
  const { status, data } = response;
  console.log(data);
  return { status, data };
};

// AI에게 내용 보내기
/*export const sendForm = async ({ form }) => {
  const response = await axiosInstance.post(`api/generate-mail`, { form });
  const { status, data } = response;
  return { status, data };
};*/

// AI에게 내용 보내기
export const sendForm = async ({ form1, form2, form3, language, state }) => {
  // 전달할 데이터를 하나의 객체로 통합
  const formData = {
    form1,
    form2,
    form3,
    language,
    state
  };

  try {
    // POST 요청을 보내면서 formData를 함께 전송
    const response = await axiosInstance.post('/api/generate-mail', formData);
    const { status, data } = response;
    return { status, data }; // 서버 응답 반환
  } catch (error) {
    console.error('AI에게 내용 보내기 실패:', error);
    throw error; // 에러 발생 시 처리
  }
};

// 생성된 메일 보내기
export const sendEmail = async ({ form }) => {
  const response = await axiosInstance.post(`/api/send-email`, { form });
  const { status, data } = response;
  return { status, data };
};
