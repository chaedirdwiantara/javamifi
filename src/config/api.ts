import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';

/**
 * API Configuration
 * Base URL changes based on platform:
 * - Android Emulator: localhost:3000
 * - iOS Simulator: localhost:3000
 * - Physical Device: Use your laptop's IP address (e.g., 192.168.1.10:3000)
 */

// Change this to your laptop's IP if testing on physical device
const LAPTOP_IP = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const BASE_URL = __DEV__
    ? `http://${LAPTOP_IP}:3000/api/v1`
    : 'https://your-production-api.com/api/v1';

/**
 * Axios instance with default configuration
 */
export const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
    (response) => {
        // Backend returns {success: true, data: ...}
        // We extract the data directly
        return response.data.data ? { ...response, data: response.data.data } : response;
    },
    (error) => {
        // Handle errors
        if (error.response) {
            // Server responded with error
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const API_CONFIG = {
    BASE_URL,
    ENDPOINTS: {
        PRODUCTS: '/products',
        CATEGORIES: '/categories',
        ORDERS: '/orders',
        PAYMENT: {
            CREATE_TRANSACTION: '/payment/create-transaction',
            CHECK_STATUS: '/payment/status',
        },
    },
};
