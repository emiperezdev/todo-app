import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface AuthStateAction {
  isAuth: boolean;
  setIsAuth: (boolean: boolean) => void;
}

const useAuthState = create<AuthStateAction>((set) => ({
  isAuth: false,
  setIsAuth: (boolean) => set(() => ({ isAuth: boolean})),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Auth State", useAuthState);

export default useAuthState;
