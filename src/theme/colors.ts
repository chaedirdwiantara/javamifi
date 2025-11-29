export const colors = {
    // Primary Brand Colors
    primary: '#007AFF',
    primaryDark: '#0051D5',
    primaryLight: '#4DA3FF',

    // Secondary Colors
    secondary: '#5856D6',
    secondaryDark: '#3634A3',
    secondaryLight: '#8E8CEA',

    // Status Colors
    success: '#34C759',
    successDark: '#248A3D',
    successLight: '#72E190',

    error: '#FF3B30',
    errorDark: '#D32F2F',
    errorLight: '#FF6B66',

    warning: '#FF9500',
    warningDark: '#C77700',
    warningLight: '#FFB340',

    info: '#5AC8FA',
    infoDark: '#32AEE8',
    infoLight: '#8EDBFC',

    // Neutral Colors
    background: '#F2F2F7',
    backgroundDark: '#E5E5EA',
    surface: '#FFFFFF',
    surfaceDark: '#F9F9F9',

    // Text Colors
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    textInverse: '#FFFFFF',

    // Border Colors
    border: '#C6C6C8',
    borderLight: '#E5E5EA',
    borderDark: '#AEAEB2',

    // Other
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#D1D1D6',
    placeholder: '#C7C7CC',
} as const;

export type ColorType = keyof typeof colors;
