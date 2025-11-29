import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../theme';
import { RootState } from '../redux/store';
import { HomeStackParamList, CartStackParamList, MainTabParamList } from './navigationTypes';

// Screens (Imports will be resolved as we create them)
import PaymentWebviewScreen from '../screens/PaymentWebviewScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartScreen from '../screens/CartScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
// import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
// import PaymentFailedScreen from '../screens/PaymentFailedScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeNavigator() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <HomeStack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{ title: 'JavaMiFi Store' }}
            />
            <HomeStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: 'Product Detail' }}
            />
        </HomeStack.Navigator>
    );
}

function CartNavigator() {
    return (
        <CartStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <CartStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Shopping Cart' }}
            />
            <CartStack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: 'Checkout' }}
            />
            <CartStack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{ title: 'Payment' }}
            />
            <CartStack.Screen
                name="PaymentWebview"
                component={PaymentWebviewScreen}
                options={{ title: 'Payment Gateway' }}
            />
            {/* 
      <CartStack.Screen 
        name="PaymentSuccess" 
        component={PaymentSuccessScreen} 
        options={{headerShown: false}}
      />
      <CartStack.Screen 
        name="PaymentFailed" 
        component={PaymentFailedScreen} 
        options={{headerShown: false}}
      /> 
      */}
        </CartStack.Navigator>
    );
}

export default function AppNavigator() {
    const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.textSecondary,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = 'home';

                        if (route.name === 'HomeTab') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'CartTab') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}>
                <Tab.Screen
                    name="HomeTab"
                    component={HomeNavigator}
                    options={{ title: 'Home' }}
                />
                <Tab.Screen
                    name="CartTab"
                    component={CartNavigator}
                    options={{
                        title: 'Cart',
                        tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
