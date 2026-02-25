import { create } from 'zustand'

export const useCartStore = create((set) => ({
    cartItems: [],
    isOpen: false,
    appliedCoupon: null,  // { code, type, value, id }
    discount: 0,          // discount amount in ₹ (integer)

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    addItem: (product) => set((state) => {
        const size = product.size || 'M';
        const cartItemId = `${product.id}-${size}`;

        const existingItem = state.cartItems.find((item) => item.cartItemId === cartItemId)
        if (existingItem) {
            return {
                cartItems: state.cartItems.map((item) =>
                    item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
                ),
            }
        }
        return { cartItems: [...state.cartItems, { ...product, size, cartItemId, quantity: product.quantity || 1 }], isOpen: true }
    }),

    removeItem: (cartItemId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.cartItemId !== cartItemId),
    })),

    updateQuantity: (cartItemId, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
    })),

    clearCart: () => set({ cartItems: [], appliedCoupon: null, discount: 0 }),

    // coupon: { id, code, type ('percent'|'flat'), value }
    // discountAmount: final ₹ savings (already computed)
    applyCoupon: (coupon, discountAmount) => set({ appliedCoupon: coupon, discount: discountAmount }),

    removeCoupon: () => set({ appliedCoupon: null, discount: 0 }),

    getTotal: () => {
        // Note: This helper might be better as a selector or inside the component
        // but putting a basic one here for now. Prices are strings in our sample, 
        // so we'd need to parse them.
    }
}))
