import { Order, PaymentStatus } from '../../types/order';

/**
 * Payment Service - Mock Implementation
 * This will be replaced with Midtrans integration when account is ready
 */

const MOCK_PAYMENT_DELAY = 2000; // 2 seconds to simulate payment processing

export interface PaymentResponse {
    success: boolean;
    orderId: string;
    paymentStatus: PaymentStatus;
    message: string;
    transactionId?: string;
}

/**
 * Initialize mock payment
 * Simulates payment processing with random success/failure
 * @param order - Order to process payment for
 * @returns Promise with payment result
 */
export const initiateMockPayment = async (order: Order): Promise<PaymentResponse> => {
    console.log('🔄 Processing mock payment for order:', order.id);

    // Simulate payment processing delay
    await new Promise<void>(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));

    // Simulate 90% success rate for demo purposes
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
        return {
            success: true,
            orderId: order.id,
            paymentStatus: 'success',
            message: 'Pembayaran berhasil!',
            transactionId: `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        };
    } else {
        return {
            success: false,
            orderId: order.id,
            paymentStatus: 'failed',
            message: 'Pembayaran gagal. Silakan coba lagi.',
        };
    }
};

/**
 * Check payment status (mock)
 * @param orderId - Order ID to check
 * @returns Promise with payment status
 */
export const checkPaymentStatus = async (orderId: string): Promise<PaymentResponse> => {
    await new Promise<void>(resolve => setTimeout(resolve, 500));

    // For mock, just return success
    return {
        success: true,
        orderId,
        paymentStatus: 'success',
        message: 'Payment verified',
    };
};

/**
 * Process refund (mock)
 * @param orderId - Order ID to refund
 * @returns Promise with refund result
 */
export const processRefund = async (orderId: string): Promise<PaymentResponse> => {
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    return {
        success: true,
        orderId,
        paymentStatus: 'pending',
        message: 'Refund sedang diproses',
    };
};
