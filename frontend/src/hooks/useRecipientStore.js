import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipientStore = create(
  persist(
    (set) => ({
      recipient: {
        name: '',
        email: "",
        file: null,
      },
      setRecipient: (data) =>
        set((state) => ({
          recipient: { ...state.recipient, ...data },
        })),
    }),
    {
      name: "recipient-storage",
    }
  )
);

export default useRecipientStore;