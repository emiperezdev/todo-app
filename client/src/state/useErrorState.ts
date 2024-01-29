import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface ErrorsStateAction {
  errors: string;
  setErrors: (error: string) => void;
}

const useErrorState = create<ErrorsStateAction>((set) => ({
  errors: "",
  setErrors: (error) => set(() => ({ errors: error })),
}));

if (process.env.NODE_ENV === 'development') 
  mountStoreDevtool('Error State', useErrorState);

export default useErrorState;
