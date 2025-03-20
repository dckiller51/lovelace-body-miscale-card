export const COLOR_HEX_MAP: { [key: string]: string } = {
  disabled: 'null',
  red: '#f44336',
  pink: '#e91e63',
  purple: '#926bc7',
  'deep-purple': '#6e41ab',
  indigo: '#3f51b5',
  blue: '#2196f3',
  'light-blue': '#03a9f4',
  cyan: '#00bcd4',
  teal: '#009688',
  green: '#4caF50',
  'light-green': '#8bc34a',
  lime: '#cddc39',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  orangered: '#ff4500',
  'deep-orange': '#ff6f22',
  brown: '#795548',
  'light-grey': '#bdbdbd',
  grey: '#9e9e9e',
  'dark-grey': '#606060',
  'blue-grey': '#607d8b',
  darkgreen: '#006400',
  royalblue: '#4169e1',
  black: '#000000',
  white: '#FFFFFF',
};

export const BODY_COLORS = new Set(Object.keys(COLOR_HEX_MAP));

export function computeCssColor(color: string): string {
  if (COLOR_HEX_MAP[color]) {
    return COLOR_HEX_MAP[color];
  }
  return COLOR_HEX_MAP.disabled || 'disabled';
}
