import FavoriteList from "../components/FavoriteList";
import ContactList from "../components/ContactList";
import RecentList from "../components/RecentList";
import { TabConfigItem } from "../components/types";
import { SCREEN_WIDTH } from "@constants";
import { s } from "@utils";

export const TABS_CONFIG: TabConfigItem[] = [
  {
    iconName: "heart",
    iconSize: s(25),
    iconScaleFactor: 0.8,
    component: FavoriteList,
  },
  {
    iconName: "person",
    iconSize: s(23),
    iconScaleFactor: 0.85,
    component: ContactList,
  },
  {
    iconName: "time",
    iconSize: s(24),
    iconScaleFactor: 0.8,
    component: RecentList,
  },
];

export const BAR_PADDING = s(20 - TABS_CONFIG.length);
export const BAR_LENGHT =
  (SCREEN_WIDTH - BAR_PADDING * (2 + TABS_CONFIG.length - 1)) /
    TABS_CONFIG.length -
  1;
