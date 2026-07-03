import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: AuthUser | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      error: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || password.length < 8) {
          set({
            loading: false,
            error: "Please provide a valid email and password.",
          });
          return false;
        }

        set({
          loading: false,
          user: {
            id: normalizedEmail,
            email: normalizedEmail,
            name: normalizedEmail.split("@")[0],
          },
        });
        return true;
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const normalizedEmail = email.trim().toLowerCase();
        if (name.trim().length < 2 || !normalizedEmail || password.length < 8) {
          set({
            loading: false,
            error: "Name, email, and password must be valid.",
          });
          return false;
        }

        set({
          loading: false,
          user: {
            id: normalizedEmail,
            email: normalizedEmail,
            name: name.trim(),
          },
        });
        return true;
      },

      logout: () => {
        set({ user: null });
      },

      requestPasswordReset: async (email) => {
        set({ loading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail) {
          set({
            loading: false,
            error: "Please enter a valid email.",
          });
          return false;
        }

        set({ loading: false });
        return true;
      },

      isAuthenticated: () => Boolean(get().user),
    }),
    {
      name: "exclusive-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
