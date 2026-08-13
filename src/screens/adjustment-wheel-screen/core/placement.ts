import { ITEM_WIDTH } from "../assets/config";
import {
  CENTER_OPACITY_OFFSET,
  CENTER_TO_EDGE_FADE_INTERVALS,
  DRAW_ITEMS,
  EDGE_OPACITY_OFFSET,
} from "./derived";

/**
 * Calculates the extra sideways shift that compresses mark spacing near the left and right edges.
 *
 * @param centerOffset - Offset from the current center position, measured in interval units.
 * @returns Horizontal edge compression correction in pixels.
 */
export const getPerspectiveShift = (centerOffset: number) => {
  "worklet";

  const absoluteCenterOffset = Math.abs(centerOffset);

  // The centre mark and its immediate neighbours need no extra compression.
  if (absoluteCenterOffset <= 1) {
    return 0;
  }

  const clampedCenterOffset = Math.min(absoluteCenterOffset, DRAW_ITEMS);
  const fullIntervalsFromCenter = Math.floor(clampedCenterOffset);
  const magnitude =
    ((fullIntervalsFromCenter - 1) * (fullIntervalsFromCenter + 2)) / 2 +
    (clampedCenterOffset - fullIntervalsFromCenter) *
      (fullIntervalsFromCenter + 1);

  return centerOffset < 0 ? -magnitude : magnitude;
};

/**
 * Calculates interval opacity based on its distance from the center.
 *
 * @param centerOffset - Offset from the current center position, measured in interval units.
 * @returns Interval opacity between 0 and 1.
 */
export const getIntervalOpacity = (centerOffset: number) => {
  "worklet";

  const absoluteCenterOffset = Math.abs(centerOffset);

  // Opacity for intervals within the center section
  if (absoluteCenterOffset <= CENTER_OPACITY_OFFSET) {
    return 1;
  }

  // Opacity for intervals between the center and edge sections.
  if (absoluteCenterOffset <= EDGE_OPACITY_OFFSET) {
    return (
      1 -
      ((absoluteCenterOffset - CENTER_OPACITY_OFFSET) * 0.75) /
        CENTER_TO_EDGE_FADE_INTERVALS
    );
  }

  // Opacity for intervals within the edge section.
  if (absoluteCenterOffset < DRAW_ITEMS) {
    return 0.25 * (DRAW_ITEMS - absoluteCenterOffset);
  }
  // Intervals beyond the edge section are fully transparent.
  return 0;
};

/**
 * Calculates the interval's horizontal position and compresses spacing near the edges
 * to create the curved wheel effect.
 *
 * @param centerOffset - Offset from the current center position, measured in interval units.
 * @returns Horizontal translation applied to the interval within the wheel in pixels.
 */
export const getIntervalTranslateX = (centerOffset: number) => {
  "worklet";

  return -centerOffset * ITEM_WIDTH + getPerspectiveShift(centerOffset);
};
