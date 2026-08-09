export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray: "#666972",
  lightGray: "#C5C5C7",
  darkGray: "#424242",
  transBlack: "rgba(0,0,0,0.8)",
  transWhite: "rgba(255,255,255,0.5)",
} as const;

export type ColorName = keyof typeof colors;
