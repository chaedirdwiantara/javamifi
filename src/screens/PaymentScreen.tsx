import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PaymentScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/currency';
import { initiateMockPayment } from '../api/services/paymentService';

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { currentOrder, loading } = useAppSelector(state => state.order);

    useEffect(() => {
        if (currentOrder && currentOrder.paymentStatus === 'pending') {
            // Auto-trigger logic could go here
        }
    }, [currentOrder]);

    const handlePay = () => {
        simulatePayment();
    };

    const simulatePayment = async () => {
        if (!currentOrder) return;

        // In a real app, we would dispatch an action to start payment
        // For this MVP, we simulate the UI flow here

        Alert.alert(
            'Processing Payment',
            'Please wait while we process your payment...',
            [{ text: 'OK', onPress: () => finishPayment() }]
        );
    };

    const finishPayment = () => {
        // Navigate to Home after "success"
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTab' }],
        });

        Alert.alert('Success', 'Payment successful! Thank you for your order.');
    };

    if (!currentOrder) {
        return (
            <View style={styles.centerContainer}>
                <Text>No active order</Text>
                <Button title="Go Home" onPress={() => navigation.navigate('HomeTab')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Icon name="credit-card-check-outline" size={64} color={theme.colors.primary} />
                <Text style={styles.title}>Payment Confirmation</Text>
                <Text style={styles.amount}>{formatCurrency(currentOrder.totalAmount)}</Text>
                <Text style={styles.orderId}>Order ID: {currentOrder.id}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Please complete your payment to finalize the order.
                        This is a mock payment page.
                    </Text>
                </View>

                <Button
                    title="Pay Now (Mock)"
                    onPress={handlePay}
                    style={styles.payButton}
                    size="large"
                />
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
});

export default PaymentScreen;
