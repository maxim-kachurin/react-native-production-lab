import { PixelRatio } from "react-native";
import {
  ANDROID_ITEM_WIDTH_BASE,
  ANDROID_VISIBLE_ITEMS,
  ANDROID_WHEEL_HORIZONTAL_SPACE,
  INDEX_OFFSET,
  LENGTH,
} from "../assets/config";
import { SCREEN_WIDTH } from "@constants";

//TODO: Add JSDocs
const roundToEvenPixel = (value: number) => {
  const pixelRatio = PixelRatio.get();

  return (2 * Math.round((value * pixelRatio) / 2)) / pixelRatio;
};

const getPerspectiveShifts = (intervalCount: number) => {
  let previousShift = 0;
  const negativeShifts = [0, 0, 0];
  const positiveShifts: number[] = [];

  for (let index = 0; index < intervalCount; index++) {
    const shift = previousShift + 2 + index;

    positiveShifts.push(shift);
    negativeShifts.unshift(-shift);
    previousShift = shift;
  }

  return negativeShifts.concat(positiveShifts);
};

export function getHeaderText(index: number, offset: number) {
  return `${index < 10 - offset ? "0" : ""}${index + offset}:00`;
}

export const ANDROID_ITEM_WIDTH = roundToEvenPixel(ANDROID_ITEM_WIDTH_BASE);

export const ANDROID_DRAW_ITEMS = Math.floor(ANDROID_VISIBLE_ITEMS / 2);

export const ANDROID_WHEEL_WIDTH = roundToEvenPixel(
  SCREEN_WIDTH - ANDROID_WHEEL_HORIZONTAL_SPACE,
);

export const ANDROID_WHEEL_PADDING =
  ANDROID_WHEEL_WIDTH / 2 - ANDROID_ITEM_WIDTH / 2;

export const ANDROID_INTERVAL_OFFSETS = [
  ...Array(ANDROID_VISIBLE_ITEMS).keys(),
].map(index => index - ANDROID_DRAW_ITEMS);

export const ANDROID_PERSPECTIVE_SHIFTS = getPerspectiveShifts(
  ANDROID_DRAW_ITEMS - 1,
);

export const ANDROID_WHEEL_ITEMS = Array.from(
  { length: LENGTH },
  (_, index) => {
    const value = index + INDEX_OFFSET;

    return {
      value,
      label: String(value),
    };
  },
);
