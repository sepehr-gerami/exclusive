import { create } from "zustand";

interface SearchUIState {
  mobileOpenSignal: number;
  requestMobileOpen: () => void;

  mobileSearchActive: boolean;
  setMobileSearchActive: (active: boolean) => void;

  isMobileSearchOpen: boolean;
  setMobileSearchOpen: (open: boolean) => void;
}

export const useSearchUIStore = create<SearchUIState>((set) => ({
  mobileOpenSignal: 0,
  requestMobileOpen: () =>
    set((state) => ({
      mobileOpenSignal: state.mobileOpenSignal + 1,
      isMobileSearchOpen: true,
    })),

  mobileSearchActive: false,
  setMobileSearchActive: (active) => set({ mobileSearchActive: active }),

  isMobileSearchOpen: false,
  setMobileSearchOpen: (open) => set({ isMobileSearchOpen: open }),
}));