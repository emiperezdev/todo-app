import { create } from "zustand";
import RegisterDto from "../entities/register.entity";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface UserStateAction {
  user: RegisterDto;
  setUser: (userInfo: RegisterDto) => void;
}

const useUserState = create<UserStateAction>((set) => ({
  user: {} as RegisterDto,
  setUser: (userInfo) => set(() => ({ user: userInfo })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("User State", useUserState);

export default useUserState;
