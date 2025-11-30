import { Product, ProductListResponse, ProductCategory } from '../../types/product';
import { apiClient, API_CONFIG } from '../../config/api';

/**
 * Product Service
 * Fetches product data from backend API
 */

/**
 * Map backend category to mobile app category enum
 */
const mapBackendCategory = (backendCategory: { name: string }): ProductCategory => {
    const mapping: Record<string, ProductCategory> = {
        'SIM Card': 'SIM_CARD',
        'Modem': 'MODEM_WIFI',
        'Accessories': 'ACCESSORIES',
    };
    return mapping[backendCategory.name] || 'ACCESSORIES';
};

/**
 * Map backend product to mobile product type
 */
const mapBackendProduct = (backendProduct: any): Product => {
    return {
        id: backendProduct.id,
        name: backendProduct.name,
        category: mapBackendCategory(backendProduct.category),
        price: backendProduct.price,
        description: backendProduct.description,
        image: backendProduct.image_url,
        stock: backendProduct.stock,
        specifications: backendProduct.specs || {},
    };
};

/**
 * Fetch all products
 * @returns Promise with product list
 */
export const fetchProducts = async (): Promise<ProductListResponse> => {
    try {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS);

        const { products, pagination } = response.data;

        const mappedProducts = products.map(mapBackendProduct);

        return {
            products: mappedProducts,
            total: pagination.total,
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

/**
 * Fetch single product by ID
 * @param productId - Product ID
 * @returns Promise with product data or null if not found
 */
export const fetchProductDetail = async (productId: string): Promise<Product | null> => {
    try {
        const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`);

        return mapBackendProduct(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error('Failed to fetch product detail:', error);
        throw error;
    }
};

/**
 * Search products by name or category
 * @param query - Search query
 * @returns Promise with filtered products
 */
export const searchProducts = async (query: string): Promise<ProductListResponse> => {
    try {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS, {
            params: { search: query },
        });

        const { products, pagination } = response.data;

        const mappedProducts = products.map(mapBackendProduct);

        return {
            products: mappedProducts,
            total: pagination.total,
        };
    } catch (error) {
        console.error('Failed to search products:', error);
        throw error;
    }
};
