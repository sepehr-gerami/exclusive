import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    itemCount: () => number;
    totalPrice: () => number;
};

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

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
                set({ items: [] });
            },

            itemCount: () =>
                get().items.reduce((total, item) => total + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
        }),
        {
            name: "exclusive-cart",
        }
    )
);
