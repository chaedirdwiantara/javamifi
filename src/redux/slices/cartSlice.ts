import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../types/cart';
import { Product } from '../../types/product';

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    itemCount: 0,
    loading: false,
    error: null,
};

const calculateTotals = (items: CartItem[]) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return { itemCount, totalAmount };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find(item => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }

            const totals = calculateTotals(state.items);
            state.itemCount = totals.itemCount;
            state.totalAmount = totals.totalAmount;
        },

        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.product.id !== action.payload);

            const totals = calculateTotals(state.items);
            state.itemCount = totals.itemCount;
            state.totalAmount = totals.totalAmount;
        },

        updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.product.id === productId);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item.product.id !== productId);
                } else {
                    item.quantity = quantity;
                }

                const totals = calculateTotals(state.items);
                state.itemCount = totals.itemCount;
                state.totalAmount = totals.totalAmount;
            }
        },

        clearCart(state) {
            state.items = [];
            state.itemCount = 0;
            state.totalAmount = 0;
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError,
} = cartSlice.actions;

export default cartSlice.reducer;
