import {
  CENTER_FADE_INTERVALS,
  CENTER_OPACITY,
  EDGE_FADE_INTERVALS,
  EDGE_OPACITY,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  LONG_MARK_HEIGHT,
  MARK_WIDTH,
  VISIBLE_ITEMS,
  WHEEL_WIDTH,
} from "../assets/config";

/**
 * Number of recycling views maintained on each side of the center.
 */
export const DRAW_ITEMS = Math.floor(VISIBLE_ITEMS / 2);

//TODO: Add JSDoc
export const WHEEL_PADDING = WHEEL_WIDTH / 2 - ITEM_WIDTH / 2;

/**
 * Horizontal position of a mark inside its interval area.
 */
export const MARK_LEFT_WITHIN_INTERVAL = (ITEM_WIDTH - MARK_WIDTH) / 2;

/**
 * Vertical position shared by long and scaled short marks.
 */
export const MARK_TOP = (ITEM_HEIGHT - LONG_MARK_HEIGHT + ITEM_WIDTH) / 2;

/**
 * Amount removed while fading from center opacity to edge opacity.
 */
export const CENTER_TO_EDGE_OPACITY_DROP = CENTER_OPACITY - EDGE_OPACITY;

//TODO: Add JSDoc
export const CENTER_OPACITY_OFFSET = DRAW_ITEMS - CENTER_FADE_INTERVALS;
export const EDGE_OPACITY_OFFSET = DRAW_ITEMS - EDGE_FADE_INTERVALS;

/**
 * Distance over which opacity fades from CENTER_OPACITY to EDGE_OPACITY.
 */
export const CENTER_TO_EDGE_FADE_INTERVALS =
  EDGE_OPACITY_OFFSET - CENTER_OPACITY_OFFSET;
