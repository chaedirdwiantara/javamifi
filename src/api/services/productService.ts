import { Product, ProductListResponse } from '../../types/product';
import { getAllProducts, getProductById } from '../dummy/products';

/**
 * Product Service
 * Currently returns dummy data, will be replaced with real API calls
 */

const SIMULATED_DELAY = 500; // 500ms to simulate network delay

/**
 * Fetch all products
 * @returns Promise with product list
 */
export const fetchProducts = async (): Promise<ProductListResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

    const products = getAllProducts();

    return {
        products,
        total: products.length,
    };
};

/**
 * Fetch single product by ID
 * @param productId - Product ID
 * @returns Promise with product data or null if not found
 */
export const fetchProductDetail = async (productId: string): Promise<Product | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

    const product = getProductById(productId);

    return product || null;
};

/**
 * Search products by name or category
 * @param query - Search query
 * @returns Promise with filtered products
 */
export const searchProducts = async (query: string): Promise<ProductListResponse> => {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

    const allProducts = getAllProducts();
    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    return {
        products: filtered,
        total: filtered.length,
    };
};

// TODO: When real API is ready, replace with:
// export const fetchProducts = async (): Promise<ProductListResponse> => {
//   const response = await axios.get(`${API_CONFIG.BASE_URL}/products`);
//   return response.data;
// };
