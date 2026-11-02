import { primitiveTokens } from './tokens/primitive';

export const layout = {
  grid: {
    columns: primitiveTokens.grid.count,
    margin: primitiveTokens.grid.margin,
    gutter: primitiveTokens.grid.gutter,
  },

  screenPaddingHorizontal: primitiveTokens.unit[20],
} as const;
