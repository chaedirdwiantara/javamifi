import Config from 'react-native-config';

/**
 * Midtrans Configuration
 * 
 * IMPORTANT: Keys are now loaded from .env file
 * This prevents secrets from being committed to Git
 */

export const MIDTRANS_CONFIG = {
    // Sandbox Environment
    isProduction: false,

    // Midtrans Sandbox Keys (loaded from .env)
    serverKey: Config.MIDTRANS_SERVER_KEY || '',
    clientKey: Config.MIDTRANS_CLIENT_KEY || '',

    // API Endpoints
    snapUrl: 'https://app.sandbox.midtrans.com/snap/v1/transactions',

    // Merchant Info
    merchantName: Config.MIDTRANS_MERCHANT_NAME || 'JavaMiFi Store',
};

/**
 * Get Authorization Header for Midtrans API
 * Server Key must be base64 encoded and appended with colon
 */
export const getAuthHeader = (): string => {
    // Use base64 encoding for React Native
    const base64 = require('base-64');
    const encodedKey = base64.encode(MIDTRANS_CONFIG.serverKey + ':');
    return `Basic ${encodedKey}`;
};
