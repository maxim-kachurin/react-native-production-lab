export const icons = {
  add: require("@assets/vector/add.svg").default,
  caretUp: require("@assets/vector/caretUp.svg").default,
  chevronBack: require("@assets/vector/chevronBack.svg").default,
  chevronForward: require("@assets/vector/chevronForward.svg").default,
  search: require("@assets/vector/search.svg").default,
  heart: require("@assets/vector/heart.svg").default,
  heartOutline: require("@assets/vector/heartOutline.svg").default,
  person: require("@assets/vector/person.svg").default,
  personOutline: require("@assets/vector/personOutline.svg").default,
  time: require("@assets/vector/time.svg").default,
  timeOutline: require("@assets/vector/timeOutline.svg").default,
};

export type IconName = keyof typeof icons;
