import { create } from "zustand";

type State = {
  endTime: number;
};

export const useFlashSaleStore = create<State>(() => ({
  endTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
}));