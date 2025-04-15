import { create } from "zustand";
import Cookies from "js-cookie";
import { localDataNames } from "../constant/appInfor";

interface AuthState {
  token: string;
  _id: string;
  firstname: string;
  lastname: string;
  rule: number;
  email: string;
}

interface AuthStore {
  auth: AuthState;
  addAuth: (data: AuthState) => void;
  removeAuth: () => void;
  refreshToken: (token: string) => void;
}

const initialState: AuthState = {
  token: "",
  _id: "",
  firstname: "",
  rule: 0,
  lastname: "",
  email: "",
};

const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") return initialState;

  const savedAuth = Cookies.get(localDataNames.authData);
  if (savedAuth) {
    try {
      return JSON.parse(savedAuth);
    } catch (error) {
      console.error("Error parsing auth data from cookies:", error);
      return initialState;
    }
  }
  return initialState;
};

const syncLocal = (data: any) => {
  if (data?.token) {
    Cookies.set(localDataNames.authData, JSON.stringify(data), { expires: 7 });
  } else {
    Cookies.remove(localDataNames.authData);
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: loadInitialState(),
  addAuth: (data) => {
    set({ auth: data });
    syncLocal(data);
  },
  removeAuth: () => {
    set({ auth: initialState });
    syncLocal(null);
    localStorage.clear();
  },
  refreshToken: (token) => {
    set((state) => ({
      auth: { ...state.auth, token },
    }));
    syncLocal({ ...useAuthStore.getState().auth });
  },
}));
