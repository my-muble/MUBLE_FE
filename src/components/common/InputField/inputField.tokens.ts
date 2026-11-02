import { componentTokens, semanticTokens, typography } from '@/styles';

import type { InputFieldVisualState } from './InputField.types';

type InputFieldStateColors = {
  background: string;
  border: string;
  text: string;
  placeholder: string;
  icon: string;
};

const input = componentTokens.input;

export const inputFieldTokens = {
  size: {
    height: 48,
    icon: 24,
  },

  spacing: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },

  border: {
    width: 1,
    radius: input.radius.number,
  },

  typography: typography.body1,

  figmaColorTokens: {
    default: {
      background: 'color/background/primary',
      border: 'color/border/default',
      text: 'color/text/primary',
      icon: 'color/icon/secondary',
    },

    focus: {
      background: 'color/background/secondary',
      border: 'color/border/strong',
      text: 'color/text/primary',
      icon: 'color/icon/primary',
    },

    fill: {
      background: 'color/background/primary',
      border: 'color/border/default',
      text: 'color/text/primary',
      icon: 'color/icon/secondary',
    },

    error: {
      background: 'color/background/primary',
      border: 'color/status/error',
      text: 'color/text/primary',
      icon: 'color/icon/secondary',
    },

    success: {
      background: 'color/background/primary',
      border: 'color/status/success',
      text: 'color/text/primary',
      icon: 'color/icon/secondary',
    },

    disabled: {
      background: 'color/background/tertiary',
      border: 'color/border/subtle',
      text: 'color/text/disabled',
      icon: 'color/icon/disabled',
    },
  },

  colors: {
    default: {
      background: input.background.default,
      border: input.border.default,
      text: input.text.value,
      placeholder: input.text.placeholder,
      icon: input.icon.default,
    },

    focus: {
      background: input.background.focus,
      border: input.border.focus,
      text: input.text.value,
      placeholder: input.text.placeholder,
      icon: input.icon.focus,
    },

    fill: {
      background: input.background.default,
      border: input.border.default,
      text: input.text.value,
      placeholder: input.text.placeholder,
      icon: input.icon.default,
    },

    error: {
      background: input.background.default,
      border: input.border.error,
      text: input.text.value,
      placeholder: input.text.placeholder,
      icon: input.icon.default,
    },

    success: {
      background: input.background.default,
      border: semanticTokens.color.status.success,
      text: input.text.value,
      placeholder: input.text.placeholder,
      icon: input.icon.default,
    },

    disabled: {
      background: input.background.disabled,
      border: input.border.disabled,
      text: input.text.disabled,
      placeholder: input.text.disabled,
      icon: input.icon.disabled,
    },
  } satisfies Record<InputFieldVisualState, InputFieldStateColors>,
} as const;
