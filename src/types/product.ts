export type ProductCategory = 'SIM_CARD' | 'MODEM_WIFI' | 'ACCESSORIES';

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
    description: string;
    image: string;
    stock: number;
    specifications?: Record<string, string>;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
}
