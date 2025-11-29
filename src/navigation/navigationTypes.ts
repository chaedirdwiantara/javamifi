import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// Home Stack Navigator Params
export type HomeStackParamList = {
    ProductList: undefined;
    ProductDetail: { productId: string };
};

// Cart Stack Navigator Params
export type CartStackParamList = {
    Cart: undefined;
    Checkout: undefined;
    Payment: undefined;
    PaymentWebview: {
        redirectUrl: string;
        orderId: string;
    };
    PaymentSuccess: { orderId: string; transactionId?: string };
    PaymentFailed: { orderId: string; message?: string };
};

// Bottom Tab Navigator Params
export type MainTabParamList = {
    HomeTab: undefined;
    CartTab: undefined;
};

// Screen Props Types
export type ProductListScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'ProductList'>,
    BottomTabScreenProps<MainTabParamList>
>;

export type ProductDetailScreenProps = CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>,
    BottomTabScreenProps<MainTabParamList>
>;

export type CartScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CartStackParamList, 'Cart'>,
    BottomTabScreenProps<MainTabParamList>
>;

export type CheckoutScreenProps = NativeStackScreenProps<CartStackParamList, 'Checkout'>;

export type PaymentScreenProps = NativeStackScreenProps<CartStackParamList, 'Payment'>;

export type PaymentWebviewScreenProps = NativeStackScreenProps<CartStackParamList, 'PaymentWebview'>;

export type PaymentSuccessScreenProps = NativeStackScreenProps<CartStackParamList, 'PaymentSuccess'>;

export type PaymentFailedScreenProps = NativeStackScreenProps<CartStackParamList, 'PaymentFailed'>;

// Declare global types for navigation
declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainTabParamList { }
    }
}
