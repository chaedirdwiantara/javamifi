import { apiClient, API_CONFIG } from '../../config/api';
import { CartItem } from '../../types/cart';

/**
 * Order Service
 * Handles order creation and management
 */

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface CreateOrderRequest {
    customerInfo: CustomerInfo;
    items: Array<{
        productId: string;
        quantity: number;
    }>;
}

export interface CreateOrderResponse {
    orderId: string;
    totalAmount: number;
    createdAt: string;
}

/**
 * Create new order in backend
 * @param customerInfo - Customer information from checkout form
 * @param cartItems - Items from cart
 * @returns Promise with order details including orderId
 */
export const createOrder = async (
    customerInfo: CustomerInfo,
    cartItems: CartItem[]
): Promise<CreateOrderResponse> => {
    try {
        const orderRequest: CreateOrderRequest = {
            customerInfo,
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            })),
        };

        const response = await apiClient.post(API_CONFIG.ENDPOINTS.ORDERS, orderRequest);

        return response.data;
    } catch (error: any) {
        console.error('Failed to create order:', error);

        // Extract error message from backend
        // Extract error message from backend
        const errorData = error.response?.data?.error;
        let errorMessage = errorData?.message || 'Failed to create order';

        // Append validation details if available
        if (errorData?.code === 'VALIDATION_ERROR' && Array.isArray(errorData.details)) {
            const details = errorData.details
                .map((d: any) => `• ${d.message}`)
                .join('\n');
            errorMessage += `:\n${details}`;
        }

        throw new Error(errorMessage);
    }
};

/**
 * Get order details by ID
 * @param orderId - Order ID
 * @returns Promise with order details
 */
export const getOrderById = async (orderId: string): Promise<any> => {
    try {
        const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch order:', error);
        throw error;
    }
};
