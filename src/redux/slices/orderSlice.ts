import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState, PaymentStatus } from '../../types/order';

const initialState: OrderState = {
    currentOrder: null,
    orderHistory: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Create order actions
        createOrderRequest(state, action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paymentStatus'>>) {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state, action: PayloadAction<Order>) {
            state.loading = false;
            state.currentOrder = action.payload;
            state.error = null;
        },
        createOrderFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update payment status
        updatePaymentStatus(state, action: PayloadAction<PaymentStatus>) {
            if (state.currentOrder) {
                state.currentOrder.paymentStatus = action.payload;
                state.currentOrder.updatedAt = new Date().toISOString();
            }
        },

        // Complete order (move to history)
        completeOrder(state) {
            if (state.currentOrder) {
                state.orderHistory.unshift(state.currentOrder);
                state.currentOrder = null;
            }
        },

        // Clear current order
        clearCurrentOrder(state) {
            state.currentOrder = null;
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
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    updatePaymentStatus,
    completeOrder,
    clearCurrentOrder,
    setLoading,
    setError,
} = orderSlice.actions;

export default orderSlice.reducer;
