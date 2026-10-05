import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { typography } from '@/constants/typography';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

/**
 * Campo de texto con label, icono y estados (foco, error, deshabilitado).
 *
 * @example
 * <Input label="Usuario" placeholder="@tuusuario" value={v} onChangeText={setV} />
 * <Input label="Website" error="URL inválido" />
 */
export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightSlot,
      containerStyle,
      style,
      multiline,
      onFocus,
      onBlur,
      editable = true,
      ...rest
    },
    ref,
  ) => {
    const { colors } = useAppTheme();
    const [focused, setFocused] = useState(false);

    const borderColor = error ? colors.error : focused ? colors.primary : colors.border;
    const disabled = editable === false;

    return (
      <View style={containerStyle}>
        {label ? (
          <Text style={[typography.label, { color: colors.textSecondary, marginBottom: Theme.spacing.xs }]}>
            {label}
          </Text>
        ) : null}

        <View
          style={[
            styles.field,
            { borderColor, backgroundColor: colors.background, opacity: disabled ? Theme.opacity.disabled : 1 },
            multiline && styles.multiline,
          ]}
        >
          {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
          <TextInput
            ref={ref}
            editable={editable}
            multiline={multiline}
            placeholderTextColor={colors.textLight}
            style={[typography.body, styles.input, { color: colors.text }, style]}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onBlur?.(e); }}
            {...rest}
          />
          {rightSlot ? <View style={styles.rightSlot}>{rightSlot}</View> : null}
        </View>

        {error ? (
          <Text style={[typography.caption, { color: colors.error, marginTop: Theme.spacing.xs }]}>{error}</Text>
        ) : hint ? (
          <Text style={[typography.caption, { color: colors.textLight, marginTop: Theme.spacing.xs }]}>{hint}</Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
  },
  multiline: {
    alignItems: 'flex-start',
    paddingVertical: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Theme.spacing.sm + 2,
  },
  leftIcon: {
    marginRight: Theme.spacing.sm,
  },
  rightSlot: {
    marginLeft: Theme.spacing.sm,
  },
});
