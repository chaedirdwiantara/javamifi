import { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
    itemCount: number;
}

export interface CartState extends Cart {
    loading: boolean;
    error: string | null;
}
