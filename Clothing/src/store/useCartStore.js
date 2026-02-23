import { create } from 'zustand'

export const useCartStore = create((set) => ({
    cartItems: [],
    isOpen: false,

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    addItem: (product) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id)
        if (existingItem) {
            return {
                cartItems: state.cartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            }
        }
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }], isOpen: true }
    }),

    removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

    updateQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
    })),

    clearCart: () => set({ cartItems: [] }),

    getTotal: () => {
        // Note: This helper might be better as a selector or inside the component
        // but putting a basic one here for now. Prices are strings in our sample, 
        // so we'd need to parse them.
    }
}))
