import { INDEX_OFFSET, LENGTH, VISIBLE_ITEMS } from "../assets/config";
import { DRAW_ITEMS } from "./derived";

/**
 * Recycling view indices.
 */
export const RECYCLING_VIEW_IDX = [...Array(VISIBLE_ITEMS).keys()];

/**
 * Determines which wheel interval is assigned to a recycling view.
 *
 * @param selectedIndex - Current selected wheel interval index.
 * @param recyclingViewIndex - Index of the recycled view.
 * @returns Interval index assigned to the recycling view.
 */
export const getAssignedMarkIndex = (
  selectedIndex: number,
  recyclingViewIndex: number,
) => {
  "worklet";

  const recyclingWindowLowerBoundary = selectedIndex - DRAW_ITEMS;
  return (
    recyclingViewIndex +
    VISIBLE_ITEMS *
      Math.ceil(
        (recyclingWindowLowerBoundary - recyclingViewIndex) / VISIBLE_ITEMS,
      )
  );
};

/**
 * Returns the major interval index for the given recycling view, if one exists.
 *
 * @param recyclingViewIndex - Index of the recycled view.
 * @returns Major interval index or null if none exists.
 */
export const getMajorIndexForRecyclingView = (recyclingViewIndex: number) => {
  const first = recyclingViewIndex;
  const second = recyclingViewIndex + VISIBLE_ITEMS;

  if ((first + INDEX_OFFSET) % 5 === 0) {
    return first;
  }
  if (second < LENGTH && (second + INDEX_OFFSET) % 5 === 0) {
    return second;
  }
  return null;
};
