// useFonts 키와 동일해야 하며, 커스텀 폰트는 굵기별로 family가 달라 fontWeight를 쓰지 않는다.
export const fontFamily = {
  light: 'NotoSansKR_300Light',
  regular: 'NotoSansKR_400Regular',
  medium: 'NotoSansKR_500Medium',
  bold: 'NotoSansKR_700Bold',
  black: 'NotoSansKR_900Black',
} as const;

export const typography = {
  head1: {
    fontFamily: fontFamily.black,
    fontSize: 24,
    lineHeight: 33.6,
    letterSpacing: 0,
  },

  head2: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 30.8,
    letterSpacing: 0,
  },

  head3: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.4,
  },

  title1: {
    fontFamily: fontFamily.black,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: -0.36,
  },

  title2: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
  },

  label1: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
  },

  label2: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
  },

  body1: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
  },

  body2: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
  },

  caption1: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    lineHeight: 16.8,
    letterSpacing: -0.24,
  },

  caption2: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16.8,
    letterSpacing: -0.24,
  },

  caption3: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: -0.2,
  },
} as const;
