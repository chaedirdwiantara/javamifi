import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
} from '../slices/productSlice';
import { fetchProducts } from '../../api/services/productService';

/**
 * Worker Saga: Fetch products
 */
function* fetchProductsSaga() {
    try {
        const response: Awaited<ReturnType<typeof fetchProducts>> = yield call(fetchProducts);
        yield put(fetchProductsSuccess(response.products));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
        yield put(fetchProductsFailure(errorMessage));
    }
}

/**
 * Watcher Saga: Watch for product actions
 */
export function* productSaga() {
    yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
}
