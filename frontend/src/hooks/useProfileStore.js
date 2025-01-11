import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProfileStore = create(
  persist(
    (set) => ({
      profile: {
        name: "",
        gender: "",
        age: "",
        email: "",
      },
      setProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),
    }),
    {
      name: "profile-storage",
    }
  )
);

export default useProfileStore;
