import { Contact } from "../components/types";
import { theme } from "./theme";

export const OWNER = {
  firstName: "Minh",
  lastName: "Pham",
  image: require("../assets/avatars/owner.jpg"),
  email: "minhpham.design@gmail.com",
};

export const CONTACTS: { [key: number]: Contact } = {
  0: {
    firstName: "Albert",
    lastName: "Dera",
    image: require("../assets/avatars/avatar3.jpg"),
    phoneNumber: "646566668",
  },
  1: {
    firstName: "Amber",
    lastName: "Zhu",
    color: theme.colors.greenBlueLight,
    phoneNumber: "455667900",
  },
  2: {
    firstName: "Andre",
    lastName: "Val",
    color: theme.colors.blueMid,
    phoneNumber: "455667900",
  },
  3: {
    firstName: "Ben",
    lastName: "Steward",
    color: theme.colors.yellow,
    phoneNumber: "755533868",
  },
  4: {
    firstName: "Blaise",
    lastName: "Ortiz",
    color: theme.colors.green,
    phoneNumber: "455037068",
  },
  5: {
    firstName: "Dad",
    color: theme.colors.blueMidDark,
    phoneNumber: "646537860",
  },
  6: {
    firstName: "Daniel",
    lastName: "Ingram",
    color: theme.colors.blueDark,
    phoneNumber: "646537860",
  },
  7: {
    firstName: "Kenadee",
    lastName: "Neal",
    image: require("../assets/avatars/avatar2.jpg"),
    phoneNumber: "646499032",
  },
  8: {
    firstName: "Kiara",
    color: theme.colors.greenBlueMidDark,
    phoneNumber: "646537860",
  },
  9: {
    firstName: "Larry",
    lastName: "J",
    image: require("../assets/avatars/avatar1.jpg"),
    phoneNumber: "646646646",
  },
  10: {
    firstName: "Mom",
    color: theme.colors.blueLight,
    phoneNumber: "646486122",
  },
  11: {
    firstName: "Monroe",
    lastName: "Hampton",
    color: theme.colors.greenBlueDark,
    phoneNumber: "646333444",
  },
  12: {
    firstName: "Russel",
    lastName: "Moreno",
    color: theme.colors.azure,
    phoneNumber: "650331424",
  },
  13: {
    firstName: "Work Office",
    color: theme.colors.orange,
    phoneNumber: "646537860",
  },
};

export const FAVORITES = [
  CONTACTS[9],
  CONTACTS[3],
  CONTACTS[10],
  CONTACTS[5],
  CONTACTS[7],
  CONTACTS[12],
  CONTACTS[13],
  CONTACTS[0],
  CONTACTS[11],
  CONTACTS[8],
  CONTACTS[1],
  CONTACTS[6],
];

export enum ContactRowType {
  Header,
  Contact,
}

export const CONTACT_LIST = [
  "A",
  CONTACTS[0],
  CONTACTS[1],
  CONTACTS[2],
  "B",
  CONTACTS[3],
  CONTACTS[4],
  "D",
  CONTACTS[5],
  CONTACTS[6],
  "K",
  CONTACTS[7],
  CONTACTS[8],
  "L",
  CONTACTS[9],
  "M",
  CONTACTS[10],
  CONTACTS[11],
  "R",
  CONTACTS[12],
  "W",
  CONTACTS[13],
];

export type Recent = {
  contact: Contact;
  missed: boolean;
};

export const RECENT_LIST = [
  "Today",
  { contact: CONTACTS[9], missed: true },
  { contact: CONTACTS[11], missed: false },
  { contact: CONTACTS[13], missed: false },
  "Yesterday",
  { contact: CONTACTS[3], missed: false },
  { contact: CONTACTS[4], missed: false },
  "01/12/23",
  { contact: CONTACTS[5], missed: false },
  { contact: CONTACTS[6], missed: true },
  "01/8/23",
  { contact: CONTACTS[7], missed: false },
  { contact: CONTACTS[8], missed: false },
  "01/6/23",
  { contact: CONTACTS[5], missed: false },
  { contact: CONTACTS[11], missed: true },
];
