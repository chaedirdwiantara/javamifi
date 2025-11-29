import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Text,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProductsRequest } from '../redux/slices/productSlice';
import { ProductCard } from '../components/product/ProductCard';
import { ProductListScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Product, ProductCategory } from '../types/product';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const CATEGORIES: { label: string; value: ProductCategory | 'ALL' }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'SIM Card', value: 'SIM_CARD' },
    { label: 'Modem', value: 'MODEM_WIFI' },
    { label: 'Accessories', value: 'ACCESSORIES' },
];

const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(state => state.product);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchProductsRequest());
        setTimeout(() => setRefreshing(false), 1000);
    }, [dispatch]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderItem = ({ item }: { item: Product }) => (
        <ProductCard
            product={item}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        />
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={24} color={theme.colors.textSecondary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.colors.placeholder}
                />
            </View>

            <FlatList
                horizontal
                data={CATEGORIES}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                    <Text
                        style={[
                            styles.categoryChip,
                            selectedCategory === item.value && styles.categoryChipActive,
                        ]}
                        onPress={() => setSelectedCategory(item.value)}>
                        {item.label}
                    </Text>
                )}
            />
        </View>
    );

    if (loading && !refreshing && products.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="package-variant" size={64} color={theme.colors.disabled} />
                        <Text style={styles.emptyText}>No products found</Text>
                    </View>
                }
            />
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
    header: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        marginBottom: theme.spacing.sm,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    searchInput: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        marginLeft: theme.spacing.sm,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.base,
    },
    categoryList: {
        paddingVertical: theme.spacing.xs,
    },
    categoryChip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.background,
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.sm,
        overflow: 'hidden',
        fontSize: theme.typography.fontSize.sm,
    },
    categoryChipActive: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.surface,
        fontWeight: 'bold',
    },
    listContent: {
        padding: theme.spacing.md,
        paddingTop: 0,
    },
    productCard: {
        marginBottom: theme.spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        marginTop: theme.spacing.md,
        color: theme.colors.textSecondary,
        fontSize: theme.typography.fontSize.base,
    },
});

export default ProductListScreen;
