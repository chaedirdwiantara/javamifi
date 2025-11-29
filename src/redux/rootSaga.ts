import { all, fork } from 'redux-saga/effects';
import { productSaga } from './sagas/productSaga';
import { orderSaga } from './sagas/paymentSaga';

/**
 * Root Saga
 * Combines all sagas in the application
 */
export function* rootSaga() {
    yield all([
        fork(productSaga),
        fork(orderSaga),
    ]);
}
