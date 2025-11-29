// App Constants
export const APP_NAME = 'JavaMiFi';
export const APP_VERSION = '1.0.0';

// API Configuration (will be replaced with real API later)
export const API_CONFIG = {
    BASE_URL: 'https://api.javamifi.com', // Placeholder
    TIMEOUT: 30000, // 30 seconds
};

// Product Categories
export const PRODUCT_CATEGORIES = {
    SIM_CARD: 'SIM Card',
    MODEM_WIFI: 'Modem WiFi',
    ACCESSORIES: 'Accessories',
} as const;

// Payment Configuration
export const PAYMENT_CONFIG = {
    // Mock payment settings
    MOCK_PAYMENT_DELAY: 2000, // 2 seconds simulation

    // Midtrans settings (to be filled when account is ready)
    MIDTRANS_CLIENT_KEY: '', // TODO: Add when Midtrans account is ready
    MIDTRANS_ENVIRONMENT: 'sandbox' as 'sandbox' | 'production',
};

// Cart Limits
export const CART_LIMITS = {
    MAX_QUANTITY_PER_ITEM: 99,
    MIN_QUANTITY_PER_ITEM: 1,
};

// Screen Names
export const SCREEN_NAMES = {
    // Home Stack
    PRODUCT_LIST: 'ProductList',
    PRODUCT_DETAIL: 'ProductDetail',

    // Cart Stack
    CART: 'Cart',
    CHECKOUT: 'Checkout',
    PAYMENT: 'Payment',
    PAYMENT_SUCCESS: 'PaymentSuccess',
    PAYMENT_FAILED: 'PaymentFailed',

    // Tab Navigator
    HOME_TAB: 'HomeTab',
    CART_TAB: 'CartTab',
} as const;

// Async Storage Keys
export const STORAGE_KEYS = {
    CART: '@javamifi_cart',
    USER: '@javamifi_user',
    ORDER_HISTORY: '@javamifi_orders',
} as const;
