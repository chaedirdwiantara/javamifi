import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PaymentWebviewScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { useAppDispatch } from '../redux/hooks';
import { completeOrder, updatePaymentStatus } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { checkPaymentStatusFromBackend } from '../api/services/midtransService';

const PaymentWebviewScreen: React.FC<PaymentWebviewScreenProps> = ({
    route,
    navigation,
}) => {
    const { redirectUrl, orderId } = route.params;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    // Setup Polling untuk cek status pembayaran
    useEffect(() => {
        startPolling();
        return () => stopPolling();
    }, []);

    const startPolling = () => {
        pollingInterval.current = setInterval(async () => {
            try {
                const response = await checkPaymentStatusFromBackend(orderId);
                console.log('🔄 Polling Response:', response);

                // Backend returns paymentStatus field
                const status = response.paymentStatus;

                if (status === 'success') {
                    handlePaymentSuccess();
                } else if (status === 'failed') {
                    handlePaymentFailure();
                }
            } catch (error) {
                console.log('Polling error:', error);
            }
        }, 5000); // Cek setiap 5 detik
    };

    const stopPolling = () => {
        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
            pollingInterval.current = null;
        }
    };

    const handleNavigationStateChange = (navState: any) => {
        const { url } = navState;
        console.log('🌐 WebView URL:', url);

        // Keep existing URL detection as backup
        if (url.includes('transaction_status=settlement') ||
            url.includes('transaction_status=capture') ||
            url.includes('status_code=200')) {
            handlePaymentSuccess();
        } else if (url.includes('transaction_status=pending')) {
            handlePaymentPending();
        } else if (url.includes('transaction_status=deny') ||
            url.includes('transaction_status=cancel')) {
            handlePaymentFailure();
        }
    };

    const handlePaymentSuccess = () => {
        stopPolling();
        console.log('✅ Payment Success!');
        dispatch(updatePaymentStatus('success'));
        dispatch(clearCart());
        dispatch(completeOrder());

        Alert.alert(
            'Payment Successful! 🎉',
            'Thank you for your order.',
            [{
                text: 'OK',
                onPress: () => {
                    (navigation.getParent() as any)?.reset({
                        index: 0,
                        routes: [{ name: 'HomeTab' }],
                    });
                }
            }]
        );
    };

    const handlePaymentPending = () => {
        stopPolling();
        console.log('⏳ Payment Pending');
        dispatch(updatePaymentStatus('pending'));

        Alert.alert(
            'Payment Pending',
            'Please complete your payment.',
            [{
                text: 'OK',
                onPress: () => {
                    (navigation.getParent() as any)?.reset({
                        index: 0,
                        routes: [{ name: 'HomeTab' }],
                    });
                }
            }]
        );
    };

    const handlePaymentFailure = () => {
        stopPolling();
        console.log('❌ Payment Failed');
        dispatch(updatePaymentStatus('failed'));

        Alert.alert(
            'Payment Failed',
            'Transaction failed or cancelled.',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Icon name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={{ width: 24 }} />
            </View>

            {loading && (
                <View style={styles.loadingBar}>
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
            )}

            <WebView
                source={{ uri: redirectUrl }}
                onNavigationStateChange={handleNavigationStateChange}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: theme.colors.surface,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    closeBtn: {
        padding: 8,
    },
    loadingBar: {
        height: 3,
        width: '100%',
        backgroundColor: theme.colors.surface,
    },
    webview: {
        flex: 1,
    },
});

export default PaymentWebviewScreen;
