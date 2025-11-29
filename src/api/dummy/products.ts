import { Product } from '../../types/product';

/**
 * Dummy product data for MVP
 * This will be replaced with real API calls later
 */
export const dummyProducts: Product[] = [
    // SIM Cards
    {
        id: 'sim-001',
        name: 'Kartu Perdana 4G LTE - Paket 20GB',
        category: 'SIM_CARD',
        price: 50000,
        description: 'Kartu perdana 4G LTE dengan kuota internet 20GB. Masa aktif 30 hari. Gratis telpon & SMS sesama operator.',
        image: 'https://via.placeholder.com/400x300/007AFF/FFFFFF?text=SIM+20GB',
        stock: 150,
        specifications: {
            'Kuota Internet': '20GB',
            'Masa Aktif': '30 Hari',
            'Jaringan': '4G LTE',
            'Bonus': 'Gratis Telpon & SMS'
        }
    },
    {
        id: 'sim-002',
        name: 'Kartu Perdana 4G LTE - Paket 50GB',
        category: 'SIM_CARD',
        price: 100000,
        description: 'Kartu perdana 4G LTE dengan kuota internet 50GB. Masa aktif 30 hari. Gratis telpon & SMS unlimited.',
        image: 'https://via.placeholder.com/400x300/34C759/FFFFFF?text=SIM+50GB',
        stock: 200,
        specifications: {
            'Kuota Internet': '50GB',
            'Masa Aktif': '30 Hari',
            'Jaringan': '4G LTE',
            'Bonus': 'Telpon & SMS Unlimited'
        }
    },
    {
        id: 'sim-003',
        name: 'Kartu Perdana 4G LTE - Paket Unlimited',
        category: 'SIM_CARD',
        price: 150000,
        description: 'Kartu perdana 4G LTE dengan kuota unlimited (FUP 100GB). Masa aktif 30 hari. Kecepatan full speed sampai FUP.',
        image: 'https://via.placeholder.com/400x300/FF9500/FFFFFF?text=SIM+Unlimited',
        stock: 100,
        specifications: {
            'Kuota Internet': 'Unlimited (FUP 100GB)',
            'Masa Aktif': '30 Hari',
            'Jaringan': '4G LTE',
            'Kecepatan': 'Full Speed sampai FUP'
        }
    },

    // Modem WiFi
    {
        id: 'modem-001',
        name: 'Modem WiFi Portable 4G - Basic',
        category: 'MODEM_WIFI',
        price: 450000,
        description: 'Modem WiFi portable 4G LTE dengan baterai 2000mAh. Mendukung hingga 10 perangkat simultan. Cocok untuk traveling.',
        image: 'https://via.placeholder.com/400x300/5856D6/FFFFFF?text=Modem+Basic',
        stock: 75,
        specifications: {
            'Jaringan': '4G LTE Cat 4',
            'Baterai': '2000mAh',
            'Max Devices': '10 Perangkat',
            'Kecepatan': 'Download 150Mbps, Upload 50Mbps'
        }
    },
    {
        id: 'modem-002',
        name: 'Modem WiFi Portable 4G - Pro',
        category: 'MODEM_WIFI',
        price: 750000,
        description: 'Modem WiFi portable 4G LTE Premium dengan baterai 3000mAh. Mendukung hingga 32 perangkat. Dilengkapi layar LCD.',
        image: 'https://via.placeholder.com/400x300/007AFF/FFFFFF?text=Modem+Pro',
        stock: 50,
        specifications: {
            'Jaringan': '4G LTE Cat 6',
            'Baterai': '3000mAh',
            'Max Devices': '32 Perangkat',
            'Kecepatan': 'Download 300Mbps, Upload 50Mbps',
            'Fitur': 'Layar LCD, Powerbank'
        }
    },
    {
        id: 'modem-003',
        name: 'Modem WiFi Home 4G LTE Router',
        category: 'MODEM_WIFI',
        price: 950000,
        description: 'Router WiFi 4G LTE untuk rumah. 4 port LAN, 2 antena eksternal. Cocok untuk WiFi rumah dengan koneksi stabil.',
        image: 'https://via.placeholder.com/400x300/FF3B30/FFFFFF?text=Home+Router',
        stock: 40,
        specifications: {
            'Jaringan': '4G LTE Cat 4',
            'WiFi': 'Dual Band 2.4GHz & 5GHz',
            'Port': '4x LAN, 1x WAN',
            'Antena': '2x Eksternal',
            'Max Devices': '64 Perangkat'
        }
    },

    // Accessories
    {
        id: 'acc-001',
        name: 'Antena Penguat Sinyal 4G',
        category: 'ACCESSORIES',
        price: 250000,
        description: 'Antena eksternal untuk memperkuat sinyal 4G modem. Gain 25dBi. Cocok untuk area dengan sinyal lemah.',
        image: 'https://via.placeholder.com/400x300/5AC8FA/FFFFFF?text=Antena+4G',
        stock: 60,
        specifications: {
            'Gain': '25dBi',
            'Frekuensi': '1800-2600MHz',
            'Kabel': '3 Meter',
            'Connector': 'SMA Male'
        }
    },
    {
        id: 'acc-002',
        name: 'Powerbank 20000mAh Fast Charge',
        category: 'ACCESSORIES',
        price: 200000,
        description: 'Powerbank kapasitas besar 20000mAh dengan fast charging. Mendukung QC 3.0 dan PD. Cocok untuk charge modem portable.',
        image: 'https://via.placeholder.com/400x300/34C759/FFFFFF?text=Powerbank',
        stock: 120,
        specifications: {
            'Kapasitas': '20000mAh',
            'Input': 'USB-C, Micro USB',
            'Output': '2x USB-A, 1x USB-C',
            'Fast Charge': 'QC 3.0, PD 18W'
        }
    },
    {
        id: 'acc-003',
        name: 'Kabel USB Type-C 2 Meter',
        category: 'ACCESSORIES',
        price: 35000,
        description: 'Kabel USB Type-C panjang 2 meter. Mendukung fast charging dan data transfer. Cocok untuk modem dan smartphone.',
        image: 'https://via.placeholder.com/400x300/8E8E93/FFFFFF?text=USB+Cable',
        stock: 200,
        specifications: {
            'Panjang': '2 Meter',
            'Connector': 'USB-A to USB-C',
            'Support': 'Fast Charge & Data Transfer',
            'Material': 'Nylon Braided'
        }
    },
    {
        id: 'acc-004',
        name: 'Car Charger Dual USB Fast Charge',
        category: 'ACCESSORIES',
        price: 75000,
        description: 'Car charger dengan 2 port USB. Support fast charging QC 3.0. Cocok untuk charge di mobil saat traveling.',
        image: 'https://via.placeholder.com/400x300/FF9500/FFFFFF?text=Car+Charger',
        stock: 80,
        specifications: {
            'Port': '2x USB-A',
            'Output Total': '36W',
            'Fast Charge': 'QC 3.0',
            'Proteksi': 'Over Current, Over Voltage, Short Circuit'
        }
    },
];

/**
 * Get all products
 */
export const getAllProducts = (): Product[] => {
    return dummyProducts;
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
    return dummyProducts.find(product => product.id === id);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category: Product['category']): Product[] => {
    return dummyProducts.filter(product => product.category === category);
};
