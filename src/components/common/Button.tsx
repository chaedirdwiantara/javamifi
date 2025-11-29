import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { theme } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled,
    icon,
    style,
    textStyle,
    ...props
}) => {
    const getBackgroundColor = () => {
        if (disabled) return theme.colors.disabled;
        switch (variant) {
            case 'secondary':
                return theme.colors.secondary;
            case 'outline':
                return 'transparent';
            case 'danger':
                return theme.colors.error;
            default:
                return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.textSecondary;
        switch (variant) {
            case 'outline':
                return theme.colors.primary;
            default:
                return theme.colors.surface;
        }
    };

    const getBorderColor = () => {
        if (disabled) return theme.colors.disabled;
        switch (variant) {
            case 'outline':
                return theme.colors.primary;
            default:
                return 'transparent';
        }
    };

    const getPadding = () => {
        switch (size) {
            case 'small':
                return theme.spacing.sm;
            case 'large':
                return theme.spacing.lg;
            default:
                return theme.spacing.md;
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'small':
                return theme.typography.fontSize.sm;
            case 'large':
                return theme.typography.fontSize.lg;
            default:
                return theme.typography.fontSize.base;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outline' ? 1 : 0,
                    padding: getPadding(),
                },
                style,
            ]}
            disabled={disabled || loading}
            {...props}>
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text
                        style={[
                            styles.text,
                            {
                                color: getTextColor(),
                                fontSize: getFontSize(),
                                marginLeft: icon ? theme.spacing.sm : 0,
                            },
                            textStyle,
                        ]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.md,
    },
    text: {
        fontWeight: theme.typography.fontWeight.semibold,
        textAlign: 'center',
    },
});
