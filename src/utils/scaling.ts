import { Dimensions } from "react-native";

const BASE_WIDTH = 402;
const BASE_HEIGHT = 874;

const { width, height } = Dimensions.get("window");

const [h, w] = [height, width]; //width < height ? [width, height] : [height, width];

export const scale = (size: number) => (w / BASE_WIDTH) * size;

export const verticalScale = (size: number) => (h / BASE_HEIGHT) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
