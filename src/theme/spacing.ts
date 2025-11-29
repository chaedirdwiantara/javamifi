// Base unit: 4px
const BASE_UNIT = 4;

export const spacing = {
    xs: BASE_UNIT,           // 4px
    sm: BASE_UNIT * 2,       // 8px
    md: BASE_UNIT * 3,       // 12px
    lg: BASE_UNIT * 4,       // 16px
    xl: BASE_UNIT * 6,       // 24px
    '2xl': BASE_UNIT * 8,    // 32px
    '3xl': BASE_UNIT * 12,   // 48px
    '4xl': BASE_UNIT * 16,   // 64px
} as const;

export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
} as const;

export type SpacingSize = keyof typeof spacing;
export type BorderRadiusSize = keyof typeof borderRadius;
