import { CartItem } from './cart';

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

export type PaymentMethod =
    | 'credit_card'
    | 'bank_transfer'
    | 'e_wallet'
    | 'virtual_account';

export interface Order {
    id: string;
    items: CartItem[];
    totalAmount: number;
    customerInfo: CustomerInfo;
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod;
    createdAt: string;
    updatedAt: string;
}

export interface OrderState {
    currentOrder: Order | null;
    orderHistory: Order[];
    loading: boolean;
    error: string | null;
}
