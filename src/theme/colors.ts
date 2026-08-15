const palette = {
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#BCBCBC",
} as const;

export const colors = {
  text: palette.white,
  background: palette.black,
  foreground: palette.white,
  foregroundSecondary: palette.lightGray,

  //TODO: move raw colors to palette
  separator: "#222222",
  gray: "#666972",
  darkGray: "#424242",
  transBlack: "rgba(0,0,0,0.8)",
  transWhite: "rgba(255,255,255,0.5)",
} as const;

export type ColorName = keyof typeof colors;
