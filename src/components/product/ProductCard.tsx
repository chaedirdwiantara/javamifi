import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { Product } from '../../types/product';
import { theme } from '../../theme';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common/Card';

interface ProductCardProps extends TouchableOpacityProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    style,
    ...props
}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={style} {...props}>
            <Card style={styles.card}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.content}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>
                            {product.category.replace('_', ' ')}
                        </Text>
                    </View>
                    <Text style={styles.name} numberOfLines={2}>
                        {product.name}
                    </Text>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                    <Text style={styles.stock}>Stock: {product.stock}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 0,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.md,
    },
    categoryBadge: {
        backgroundColor: theme.colors.primaryLight,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.sm,
        alignSelf: 'flex-start',
        marginBottom: theme.spacing.xs,
    },
    categoryText: {
        fontSize: 10,
        color: theme.colors.surface,
        fontWeight: 'bold',
    },
    name: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
        height: 40,
    },
    price: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    stock: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
    },
});
