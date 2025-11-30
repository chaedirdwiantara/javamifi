import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createOrderRequest } from '../redux/slices/orderSlice';
import { CheckoutScreenProps } from '../navigation/navigationTypes';
import { theme } from '../theme';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency } from '../utils/currency';

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { items, totalAmount } = useAppSelector(state => state.cart);
    const { loading } = useAppSelector(state => state.order);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [errors, setErrors] = useState<Partial<typeof form>>({});

    const validate = () => {
        const newErrors: Partial<typeof form> = {};
        if (!form.name) newErrors.name = 'Name is required';

        if (!form.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

        if (!form.phone) newErrors.phone = 'Phone is required';
        else if (form.phone.length < 10) newErrors.phone = 'Phone number must be at least 10 digits';

        if (!form.address) newErrors.address = 'Address is required';
        else if (form.address.length < 10) newErrors.address = 'Address must be at least 10 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = () => {
        if (validate()) {
            dispatch(createOrderRequest({
                items,
                totalAmount,
                customerInfo: form,
            }));

            // Navigate to Payment screen immediately (Saga will handle order creation)
            // In a real app, we might wait for success action
            navigation.replace('Payment');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer Information</Text>
                    <Input
                        label="Full Name"
                        value={form.name}
                        onChangeText={text => setForm({ ...form, name: text })}
                        error={errors.name}
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email"
                        value={form.email}
                        onChangeText={text => setForm({ ...form, email: text })}
                        error={errors.email}
                        placeholder="john@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Phone Number"
                        value={form.phone}
                        onChangeText={text => setForm({ ...form, phone: text })}
                        error={errors.phone}
                        placeholder="08123456789"
                        keyboardType="phone-pad"
                    />
                    <Input
                        label="Shipping Address"
                        value={form.address}
                        onChangeText={text => setForm({ ...form, address: text })}
                        error={errors.address}
                        placeholder="Jl. Sudirman No. 1, Jakarta"
                        multiline
                        numberOfLines={3}
                        style={{ height: 80, textAlignVertical: 'top' }}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    {items.map(item => (
                        <View key={item.product.id} style={styles.orderItem}>
                            <Text style={styles.itemName}>
                                {item.quantity}x {item.product.name}
                            </Text>
                            <Text style={styles.itemPrice}>
                                {formatCurrency(item.product.price * item.quantity)}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Payment</Text>
                        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Proceed to Payment"
                    onPress={handleCheckout}
                    loading={loading}
                    style={styles.payButton}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: theme.spacing.md,
    },
    section: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: 'bold',
        marginBottom: theme.spacing.md,
        color: theme.colors.text,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    itemName: {
        flex: 1,
        color: theme.colors.text,
    },
    itemPrice: {
        fontWeight: 'medium',
        color: theme.colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.md,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    totalAmount: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    footer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    payButton: {
        width: '100%',
    },
});

export default CheckoutScreen;
