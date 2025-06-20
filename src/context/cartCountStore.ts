import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartCountState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
};


export const useCartCountStore = create<CartCountState>()(
  persist(
    (set) => ({
      count:0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
      reset: () => set({ count: 0 }),
      setCount: (count) => set({ count }),
    }),
    {
      name: "cart-count-storage", // key for localStorage
    }
  )
);
