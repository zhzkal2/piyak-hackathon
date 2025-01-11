import { create } from "zustand";

const useMailStore = create(
  (set) => ({
    mails: [], // 메일 리스트 초기화
    setMails: (newMails) => set({ mails: newMails}),
  }),
);

export default useMailStore;
