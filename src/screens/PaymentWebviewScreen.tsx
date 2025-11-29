import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { PaymentWebviewScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { useAppDispatch } from '../redux/hooks';
import { completeOrder, updatePaymentStatus } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

const PaymentWebviewScreen: React.FC<PaymentWebviewScreenProps> = ({
    route,
    navigation,
}) => {
    const { redirectUrl, orderId } = route.params;
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const handleNavigationStateChange = (navState: any) => {
        const { url } = navState;
        console.log('🌐 WebView URL:', url);

        // Check if payment is completed
        // Midtrans will redirect to finish URL with transaction_status parameter
        if (url.includes('transaction_status=settlement') || url.includes('transaction_status=capture')) {
            // Payment Success
            handlePaymentSuccess();
        } else if (url.includes('transaction_status=pending')) {
            // Payment Pending (for bank transfer, etc)
            handlePaymentPending();
        } else if (url.includes('transaction_status=deny') || url.includes('transaction_status=cancel')) {
            // Payment Failed/Cancelled
            handlePaymentFailure();
        }
    };

    const handlePaymentSuccess = () => {
        console.log('✅ Payment Success!');

        dispatch(updatePaymentStatus('success'));
        dispatch(clearCart());
        dispatch(completeOrder());

        // Navigate back to home tab
        (navigation.getParent() as any)?.reset({
            index: 0,
            routes: [{ name: 'HomeTab' }],
        });

        setTimeout(() => {
            Alert.alert(
                'Payment Successful! 🎉',
                'Thank you for your order. Your payment has been processed successfully.',
                [{ text: 'OK' }]
            );
        }, 500);
    };

    const handlePaymentPending = () => {
        console.log('⏳ Payment Pending');

        dispatch(updatePaymentStatus('pending'));

        (navigation.getParent() as any)?.reset({
            index: 0,
            routes: [{ name: 'HomeTab' }],
        });

        setTimeout(() => {
            Alert.alert(
                'Payment Pending',
                'Your payment is being processed. We will notify you once it\'s confirmed.',
                [{ text: 'OK' }]
            );
        }, 500);
    };

    const handlePaymentFailure = () => {
        console.log('❌ Payment Failed');

        dispatch(updatePaymentStatus('failed'));

        navigation.goBack();

        setTimeout(() => {
            Alert.alert(
                'Payment Failed',
                'Your payment was not successful. Please try again.',
                [{ text: 'OK' }]
            );
        }, 500);
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        zIndex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default PaymentWebviewScreen;
