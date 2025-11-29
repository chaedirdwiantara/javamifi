import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { CartScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currency';
import { CartItem } from '../types/cart';

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { items, totalAmount, itemCount } = useAppSelector(state => state.cart);

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            Alert.alert(
                'Remove Item',
                'Are you sure you want to remove this item?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Remove', onPress: () => dispatch(removeFromCart(productId)) },
                ]
            );
        } else {
            dispatch(updateQuantity({ productId, quantity: newQuantity }));
        }
    };

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                <Text style={styles.itemPrice}>{formatCurrency(item.product.price)}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        style={styles.qtyButton}>
                        <Icon name="minus" size={16} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        style={styles.qtyButton}>
                        <Icon name="plus" size={16} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.product.id))}
                style={styles.removeButton}>
                <Icon name="trash-can-outline" size={24} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );

    if (itemCount === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Icon name="cart-outline" size={80} color={theme.colors.disabled} />
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Button
                    title="Start Shopping"
                    onPress={() => navigation.navigate('HomeTab')}
                    style={styles.shopButton}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.product.id}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
                </View>
                <Button
                    title="Checkout"
                    onPress={() => navigation.navigate('Checkout')}
                    style={styles.checkoutButton}
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
    listContent: {
        padding: theme.spacing.md,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.background,
    },
    itemInfo: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    itemName: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: 'medium',
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        marginHorizontal: theme.spacing.md,
        fontSize: theme.typography.fontSize.base,
        fontWeight: 'medium',
    },
    removeButton: {
        padding: theme.spacing.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        fontSize: theme.typography.fontSize.xl,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    shopButton: {
        minWidth: 200,
    },
    footer: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        elevation: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    totalLabel: {
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.textSecondary,
    },
    totalAmount: {
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    checkoutButton: {
        width: '100%',
    },
});

export default CartScreen;
