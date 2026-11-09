const unit = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  48: 48,
  52: 52,
  56: 56,
  60: 60,
  64: 64,
  68: 68,
  80: 80,
} as const;

export const primitiveTokens = {
  color: {
    brand: {
      black: '#0B0B0B',
      white: '#FDFDFD',
    },

    neutral: {
      50: '#F6F6F9',
      100: '#E5E5EC',
      200: '#CDCDD5',
      300: '#A3A3AC',
      500: '#76767F',
      700: '#404048',
      900: '#111113',
    },

    success: {
      50: '#E9F9EF',
      100: '#BAEDCD',
      200: '#99E4B4',
      300: '#6BD892',
      400: '#4ED17D',
      500: '#23C55E',
      600: '#1FB355',
      700: '#188C42',
    },

    error: {
      50: '#FEECED',
      100: '#FBC5C6',
      200: '#F9A9AA',
      300: '#F68284',
      400: '#F4696C',
      500: '#F04447',
      600: '#DB3E41',
      700: '#AB3032',
    },

    warning: {
      50: '#FEF4E7',
      100: '#FCDEB4',
      200: '#FBCE8F',
      300: '#F9B85C',
      400: '#F8AA3D',
      500: '#F6950C',
      600: '#E0880B',
      700: '#AF6A09',
    },
  },

  unit,

  typography: {
    fontWeight: {
      300: 'Light',
      400: 'Regular',
      500: 'Medium',
      600: 'Semibold',
      700: 'Bold',
      900: 'Black',
    },

    fontFamily: {
      typeface: 'Noto Sans KR',
    },
  },

  radius: {
    s: unit[8],
    m: unit[12],
    sb: unit[16],
  },

  grid: {
    count: 5,
    margin: unit[12],
    gutter: unit[20],
  },
} as const;
