export { colors, type ColorType } from './colors';
export { typography, type FontSize, type FontWeight } from './typography';
export { spacing, borderRadius, type SpacingSize, type BorderRadiusSize } from './spacing';

export const theme = {
    colors: require('./colors').colors,
    typography: require('./typography').typography,
    spacing: require('./spacing').spacing,
    borderRadius: require('./spacing').borderRadius,
} as const;
