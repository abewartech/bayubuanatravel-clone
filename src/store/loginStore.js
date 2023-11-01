import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      username: null,
      email: null,
      setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setUsername: (username) => set({ username }),
      setEmail: (email) => set({ email })
    }),
    {
      name: "auth" // Name for the persisted storage key
    }
  )
);

export default useAuthStore;
