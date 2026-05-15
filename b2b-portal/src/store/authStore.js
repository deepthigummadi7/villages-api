import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("b2b_token") || null,
  user: JSON.parse(localStorage.getItem("b2b_user") || "null"),

  login: (token, user) => {
    localStorage.setItem("b2b_token", token);
    localStorage.setItem("b2b_user", JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("b2b_token");
    localStorage.removeItem("b2b_user");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
