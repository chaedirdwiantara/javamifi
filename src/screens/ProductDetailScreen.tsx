import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/slices/cartSlice';
import { ProductDetailScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currency';
import { fetchProductDetail } from '../api/services/productService';
import { Product } from '../types/product';

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
    route,
    navigation,
}) => {
    const { productId } = route.params;
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProductDetail(productId);
                setProduct(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to load product details');
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId, navigation]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ product, quantity }));
            Alert.alert(
                'Success',
                'Product added to cart',
                [
                    { text: 'Continue Shopping', style: 'cancel' },
                    { text: 'Go to Cart', onPress: () => navigation.navigate('CartTab', { screen: 'Cart' }) },
                ]
            );
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.centerContainer}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.category}>{product.category.replace('_', ' ')}</Text>
                        <Text style={styles.stock}>Stock: {product.stock}</Text>
                    </View>

                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {product.specifications && (
                        <>
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Specifications</Text>
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <View key={key} style={styles.specRow}>
                                    <Text style={styles.specKey}>{key}</Text>
                                    <Text style={styles.specValue}>{value}</Text>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.quantityContainer}>
                    <Button
                        title="-"
                        variant="outline"
                        size="small"
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        style={styles.quantityBtn}
                    />
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Button
                        title="+"
                        variant="outline"
                        size="small"
                        onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        style={styles.quantityBtn}
                    />
                </View>

                <Button
                    title="Add to Cart"
                    icon={<Icon name="cart-plus" size={20} color={theme.colors.surface} />}
                    onPress={handleAddToCart}
                    style={styles.addToCartBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: theme.colors.surface,
    },
    content: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        marginTop: -20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xs,
    },
    category: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize.sm,
    },
    stock: {
        color: theme.colors.textSecondary,
        fontSize: theme.typography.fontSize.sm,
    },
    name: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    price: {
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    description: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    specRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    specKey: {
        flex: 1,
        color: theme.colors.textSecondary,
        fontWeight: 'medium',
    },
    specValue: {
        flex: 2,
        color: theme.colors.text,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        elevation: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    quantityBtn: {
        width: 40,
        height: 40,
        padding: 0,
    },
    quantityText: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: 'bold',
        marginHorizontal: theme.spacing.md,
        color: theme.colors.text,
    },
    addToCartBtn: {
        flex: 1,
    },
});

export default ProductDetailScreen;
