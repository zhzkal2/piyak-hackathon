import { create } from "zustand";

const useProfileStore = create((set) => ({
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
}));

export default useProfileStore;
