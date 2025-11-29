import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PaymentScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currency';
import { getSnapToken } from '../api/services/midtransService';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { currentOrder } = useAppSelector(state => state.order);
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        if (!currentOrder) return;

        setLoading(true);

        try {
            console.log('🔄 Requesting Midtrans Snap Token...');

            // Get Snap Token from Midtrans
            const snapResponse = await getSnapToken(currentOrder);

            console.log('✅ Got Snap Token:', snapResponse.token);

            // Navigate to WebView with redirect URL
            navigation.navigate('PaymentWebview', {
                redirectUrl: snapResponse.redirect_url,
                orderId: currentOrder.id,
            });
        } catch (error) {
            console.error('❌ Payment error:', error);

            Alert.alert(
                'Payment Error',
                error instanceof Error
                    ? error.message
                    : 'Failed to initialize payment. Please try again.',
                [{ text: 'OK' }],
            );
        } finally {
            setLoading(false);
        }
    };

    if (!currentOrder) {
        return (
            <View style={styles.centerContainer}>
                <Text>No active order</Text>
                <Button
                    title="Go Home"
                    onPress={() => (navigation.getParent() as any)?.navigate('HomeTab')}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Icon
                    name="credit-card-check-outline"
                    size={64}
                    color={theme.colors.primary}
                />
                <Text style={styles.title}>Payment Confirmation</Text>
                <Text style={styles.amount}>
                    {formatCurrency(currentOrder.totalAmount)}
                </Text>
                <Text style={styles.orderId}>Order ID: {currentOrder.id}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Please complete your payment to finalize the order. You will be
                        redirected to Midtrans payment gateway.
                    </Text>
                </View>

                <Button
                    title={loading ? 'Processing...' : 'Pay with Midtrans'}
                    onPress={handlePay}
                    style={styles.payButton}
                    size="large"
                    disabled={loading}
                />

                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.primary}
                            style={{ marginTop: theme.spacing.md }}
                        />
                        <Text style={styles.loadingText}>
                            Connecting to payment gateway...
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        alignItems: 'center',
        elevation: 4,
    },
    title: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: 'bold',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        color: theme.colors.text,
    },
    amount: {
        fontSize: theme.typography.fontSize['3xl'],
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    orderId: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl,
    },
    infoContainer: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
        width: '100%',
    },
    infoText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        lineHeight: 20,
    },
    payButton: {
        width: '100%',
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    loadingText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
    },
});

export default PaymentScreen;
