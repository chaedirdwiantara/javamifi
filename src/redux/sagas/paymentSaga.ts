import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    updatePaymentStatus,
    completeOrder,
} from '../slices/orderSlice';
import { clearCart } from '../slices/cartSlice';
import { initiateMockPayment, PaymentResponse } from '../../api/services/paymentService';
import { Order } from '../../types/order';
import { RootState } from '../store';

/**
 * Worker Saga: Create order
 */
function* createOrderSaga(action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'paymentStatus'>>) {
    try {
        // Generate order ID and timestamps
        const order: Order = {
            ...action.payload,
            id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            paymentStatus: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        yield put(createOrderSuccess(order));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
        yield put(createOrderFailure(errorMessage));
    }
}

/**
 * Worker Saga: Process payment
 */
function* processPaymentSaga() {
    try {
        // Get current order from state
        const currentOrder: Order | null = yield select((state: RootState) => state.order.currentOrder);

        if (!currentOrder) {
            yield put(updatePaymentStatus('failed'));
            return;
        }

        // Update status to processing
        yield put(updatePaymentStatus('processing'));

        // Call payment service (mock)
        const response: PaymentResponse = yield call(initiateMockPayment, currentOrder);

        if (response.success) {
            yield put(updatePaymentStatus('success'));
            yield put(clearCart());
            yield put(completeOrder());
        } else {
            yield put(updatePaymentStatus('failed'));
        }
    } catch (error) {
        yield put(updatePaymentStatus('failed'));
    }
}

/**
 * Watcher Saga: Watch for order actions
 */
export function* orderSaga() {
    yield takeLatest(createOrderRequest.type, createOrderSaga);
}

/**
 * Payment Saga: Exported for manual triggering
 */
export function* paymentSaga() {
    // Can be triggered manually from payment screen
    yield call(processPaymentSaga);
}
