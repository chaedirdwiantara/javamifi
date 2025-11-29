import axios from 'axios';
import { MIDTRANS_CONFIG, getAuthHeader } from '../../config/midtrans';
import { Order } from '../../types/order';

/**
 * Midtrans Snap Transaction Response
 */
export interface MidtransSnapResponse {
    token: string;
    redirect_url: string;
}

/**
 * Generate Snap Token from Midtrans
 * This creates a payment transaction and returns a token + redirect URL
 */
export const getSnapToken = async (order: Order): Promise<MidtransSnapResponse> => {
    try {
        // Prepare transaction details for Midtrans
        const transactionDetails = {
            transaction_details: {
                order_id: order.id,
                gross_amount: order.totalAmount,
            },
            customer_details: {
                first_name: order.customerInfo.name,
                email: order.customerInfo.email,
                phone: order.customerInfo.phone,
            },
            item_details: order.items.map(item => ({
                id: item.product.id,
                price: item.product.price,
                quantity: item.quantity,
                name: item.product.name,
            })),
        };

        console.log('📤 Sending request to Midtrans:', transactionDetails);

        // Make request to Midtrans Snap API
        const response = await axios.post(
            MIDTRANS_CONFIG.snapUrl,
            transactionDetails,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthHeader(),
                },
            }
        );

        console.log('✅ Midtrans response:', response.data);

        return {
            token: response.data.token,
            redirect_url: response.data.redirect_url,
        };
    } catch (error) {
        console.error('❌ Midtrans error:', error);

        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.error_messages?.[0] ||
                'Failed to create payment transaction'
            );
        }

        throw new Error('Failed to connect to payment gateway');
    }
};

/**
 * Check transaction status from Midtrans
 * This can be used to verify payment after redirect
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
