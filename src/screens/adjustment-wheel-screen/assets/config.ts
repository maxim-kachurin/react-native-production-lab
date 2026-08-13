import { s } from "@utils";

//TODO: Add JSDocs
export const LENGTH = 55;
export const INITIAL_INDEX = 25;
export const INDEX_OFFSET = 5;
export const MARK_WIDTH = 1.5;
export const LONG_MARK_HEIGHT = 48;
export const SHORT_MARK_HEIGHT = Math.floor(LONG_MARK_HEIGHT / 1.61);
export const SHORT_MARK_SCALE = SHORT_MARK_HEIGHT / LONG_MARK_HEIGHT;
export const ITEM_WIDTH = 17;
export const ITEM_HEIGHT = 70;
export const VISIBLE_ITEMS = 29;

/**
 * Width of the visible wheel area.
 */
export const WHEEL_WIDTH = s(350);

/**
 * Opacity applied to intervals in the center section of the wheel.
 */
export const CENTER_OPACITY = 1;

/**
 * Opacity applied to intervals in the edge sections of the wheel.
 */
export const EDGE_OPACITY = 0.25;

/**
 * Number of intervals from the end of the center section to full transparency.
 */
export const CENTER_FADE_INTERVALS = 5;

/**
 * Number of intervals from EDGE_OPACITY to full transparency.
 */
export const EDGE_FADE_INTERVALS = 1;

//TODO: Add JSDocs
export const ANDROID_ITEM_WIDTH_BASE = 20;
export const ANDROID_VISIBLE_ITEMS = 23;
export const ANDROID_WHEEL_HORIZONTAL_SPACE = 20;
export const ANDROID_MARK_WIDTH = 2;
