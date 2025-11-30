import axios from 'axios';
import { apiClient, API_CONFIG } from '../../config/api';
import { getAuthHeader } from '../../config/midtrans';

/**
 * Midtrans Snap Transaction Response
 */
export interface MidtransSnapResponse {
    token: string;
    redirect_url: string;
}

/**
 * Generate Snap Token from Backend API
 * Backend handles secure server-side Midtrans integration
 * @param orderId - Order ID from backend
 */
export const getSnapToken = async (orderId: string): Promise<MidtransSnapResponse> => {
    try {
        console.log('📤 Requesting Midtrans token for order:', orderId);

        const response = await apiClient.post(
            API_CONFIG.ENDPOINTS.PAYMENT.CREATE_TRANSACTION,
            { orderId }
        );

        console.log('✅ Midtrans token received');

        return {
            token: response.data.token,
            redirect_url: response.data.redirectUrl,
        };
    } catch (error: any) {
        console.error('❌ Failed to get Midtrans token:', error);

        const errorMessage = error.response?.data?.error?.message ||
            'Failed to create payment transaction';
        throw new Error(errorMessage);
    }
};

/**
 * Check transaction status from Midtrans
 * This is still called directly from client for polling mechanism
 */
export const checkTransactionStatus = async (orderId: string): Promise<any> => {
    try {
        const statusUrl = `https://api.sandbox.midtrans.com/v2/${orderId}/status`;

        const response = await axios.get(statusUrl, {
            headers: {
                'Authorization': getAuthHeader(),
            },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Status check error:', error);
        throw new Error('Failed to check payment status');
    }
};
