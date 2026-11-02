import { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { inputFieldTokens } from './inputField.tokens';
import type { InputFieldProps, InputFieldVisualState } from './InputField.types';

export const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      status = 'default',
      disabled = false,
      renderRightIcon,
      onPressRightIcon,
      rightIconAccessibilityLabel,
      containerStyle,
      inputStyle,
      value,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,
      editable,
      placeholderTextColor,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const currentValue = value ?? internalValue;

    const getVisualState = (): InputFieldVisualState => {
      if (disabled) {
        return 'disabled';
      }

      if (status === 'error') {
        return 'error';
      }

      if (status === 'success') {
        return 'success';
      }

      if (isFocused) {
        return 'focus';
      }

      if (currentValue.length > 0) {
        return 'fill';
      }

      return 'default';
    };

    const visualState = getVisualState();
    const stateColors = inputFieldTokens.colors[visualState];

    const handleChangeText = (text: string) => {
      if (value === undefined) {
        setInternalValue(text);
      }

      onChangeText?.(text);
    };

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: stateColors.background,
            borderColor: stateColors.border,
          },
          containerStyle,
        ]}
      >
        <TextInput
          ref={ref}
          {...props}
          value={value}
          defaultValue={defaultValue}
          editable={disabled ? false : editable}
          onChangeText={handleChangeText}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          placeholderTextColor={placeholderTextColor ?? stateColors.placeholder}
          style={[
            styles.input,
            {
              color: stateColors.text,
            },
            inputStyle,
          ]}
        />

        {renderRightIcon ? (
          <Pressable
            disabled={disabled || !onPressRightIcon}
            onPress={onPressRightIcon}
            accessibilityRole={onPressRightIcon ? 'button' : undefined}
            accessibilityLabel={rightIconAccessibilityLabel}
            hitSlop={8}
            style={styles.iconContainer}
          >
            {renderRightIcon(stateColors.icon)}
          </Pressable>
        ) : null}
      </View>
    );
  },
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: inputFieldTokens.size.height,

    flexDirection: 'row',
    alignItems: 'center',

    gap: inputFieldTokens.spacing.gap,

    paddingHorizontal: inputFieldTokens.spacing.paddingHorizontal,
    paddingVertical: inputFieldTokens.spacing.paddingVertical,

    borderWidth: inputFieldTokens.border.width,
    borderRadius: inputFieldTokens.border.radius,
  },

  input: {
    ...inputFieldTokens.typography,

    flex: 1,
    minWidth: 0,

    padding: 0,
    margin: 0,
  },

  iconContainer: {
    width: inputFieldTokens.size.icon,
    height: inputFieldTokens.size.icon,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
