import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import { rootSaga } from './rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, // Disable thunk as we're using saga
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(sagaMiddleware),
    devTools: __DEV__, // Enable Redux DevTools in development
    enhancers: (getDefaultEnhancers) => {
        if (__DEV__) {
            const reactotron = require('../config/ReactotronConfig').default;
            return reactotron.createEnhancer
                ? getDefaultEnhancers().concat(reactotron.createEnhancer())
                : getDefaultEnhancers();
        }
        return getDefaultEnhancers();
    },
});

// Run root saga
sagaMiddleware.run(rootSaga);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
