import { create } from "zustand";
import { Product } from "@/types/Product";

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    items: CartItem[];

    invoice: {
        totalPrice: number;
        deliveryCost: number;
    };

    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
};

export const useCart = create<CartStore>((set, get) => ({
    // =======================
    // State
    // =======================
    items: [],

    invoice: {
        totalPrice: 0,
        deliveryCost: 0,
    },

    // =======================
    // Actions
    // =======================

    addToCart: (product) => {
        const existingItem = get().items.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            set((state) => ({
                items: state.items.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                ),
            }));
        } else {
            set((state) => ({
                items: [
                    ...state.items,
                    {
                        ...product,
                        quantity: 1,
                    },
                ],
            }));
        }
    },

    removeFromCart: (id) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    },

    increaseQuantity: (id) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            ),
        }));
    },

    decreaseQuantity: (id) => {
        set((state) => ({
            items: state.items
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0),
        }));
    },

    clearCart: () => {
        set({
            items: [],
        });
    },
}));