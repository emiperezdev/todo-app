import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface AuthStateAction {
  isAuth: boolean;
  setIsAuth: () => void;
}

const useAuthState = create<AuthStateAction>((set) => ({
  isAuth: false,
  setIsAuth: () => set(() => ({ isAuth: true})),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Auth State", useAuthState);

export default useAuthState;
