import type { WalletItemBase } from "../components/wallet";
import type { ImageSourcePropType } from "react-native";

type DemoPaymentCard = {
  title: string;
  lastFourDigits: string;
  image: ImageSourcePropType;
  textColor?: string;
};

export type BoardingPass = {
  id: string;

  // Header
  airline: string; // "Meridian Air"
  flightNumber: string; // "MA 218"

  // Route
  originCode: string; // "SFO"
  originCity: string; // "San Francisco"
  departureTime: string; // "11:25"
  destinationCode: string; // "NRT"
  destinationCity: string; // "Tokyo"
  arrivalTime: string; // "14:20"

  // Boarding
  boardingTime: string; // "10:55"
  terminal: string; // "2"
  gate: string; // "B14"
  passengerName: string; // "T. HONDA"
  seat: string; // "14A"
  barcode: ImageSourcePropType; // PDF417 Barcode
};

type DemoTransaction = {
  id: string;
  merchant: string;
  amount: string;
};

export type DemoWalletItem = WalletItemBase &
  (
    | {
        variant: "expandableCard";
        pass: BoardingPass;
      }
    | {
        variant: "cardWithDetails";
        card: DemoPaymentCard;
        transactions: readonly DemoTransaction[];
      }
  );

const TRANSACTIONS: DemoTransaction[] = [
  { id: "1", merchant: "Coffee House", amount: "-$5.40" },
  { id: "2", merchant: "Metro Transit", amount: "-$2.75" },
  { id: "3", merchant: "Corner Market", amount: "-$34.20" },
  { id: "4", merchant: "Cloud Storage", amount: "-$9.99" },
  { id: "5", merchant: "Book Store", amount: "-$18.50" },
  { id: "6", merchant: "Lunch Bar", amount: "-$12.80" },
  { id: "7", merchant: "Movie Tickets", amount: "-$24.00" },
  { id: "8", merchant: "Grocery Store", amount: "-$61.35" },
  { id: "9", merchant: "Coffee House", amount: "-$5.40" },
  { id: "10", merchant: "Metro Transit", amount: "-$2.75" },
  { id: "11", merchant: "Corner Market", amount: "-$34.20" },
  { id: "12", merchant: "Cloud Storage", amount: "-$9.99" },
  { id: "13", merchant: "Book Store", amount: "-$18.50" },
  { id: "14", merchant: "Lunch Bar", amount: "-$12.80" },
  { id: "15", merchant: "Movie Tickets", amount: "-$24.00" },
  { id: "16", merchant: "Grocery Store", amount: "-$61.35" },
];

export const WALLET_DATA: DemoWalletItem[] = [
  {
    id: "wallet-card-1",
    variant: "cardWithDetails",
    card: {
      title: "Northmark",
      lastFourDigits: "4242",
      image: require("./images/card-1.jpg"),
    },
    transactions: TRANSACTIONS,
    cardStyle: { backgroundColor: "#1A4877" },
  },
  {
    id: "wallet-card-2",
    variant: "cardWithDetails",
    card: {
      title: "Vantage",
      lastFourDigits: "8173",
      image: require("./images/card-2.jpg"),
    },
    transactions: TRANSACTIONS,
    cardStyle: { backgroundColor: "#161616" },
  },
  {
    id: "wallet-card-3",
    variant: "cardWithDetails",
    card: {
      title: "Horizon",
      lastFourDigits: "2056",
      image: require("./images/card-3.jpg"),
    },
    transactions: TRANSACTIONS,
    cardStyle: { backgroundColor: "#242424" },
  },
  {
    id: "wallet-card-4",
    variant: "cardWithDetails",
    card: {
      title: "Lumen",
      textColor: "black",
      lastFourDigits: "2651",
      image: require("./images/card-4.jpg"),
    },
    transactions: TRANSACTIONS,
    cardStyle: { backgroundColor: "#E4E5E9" },
  },
  {
    id: "wallet-card-5",
    variant: "cardWithDetails",
    card: {
      title: "Everstone",
      lastFourDigits: "8439",
      image: require("./images/card-5.jpg"),
    },
    transactions: TRANSACTIONS,
    cardStyle: { backgroundColor: "#076E45" },
  },
  {
    id: "wallet-card-61",
    variant: "expandableCard",
    pass: {
      id: "fn-224",
      airline: "Meridian Air",
      flightNumber: "MA 224",
      originCode: "NRT",
      originCity: "Tokyo",
      departureTime: "13:05",
      destinationCode: "YVR",
      destinationCity: "Vancouver",
      arrivalTime: "15:30 +1",
      boardingTime: "12:25",
      terminal: "1",
      gate: "D53",
      passengerName: "T. HONDA",
      seat: "11C",
      barcode: require("./images/pdf417-ma224.png"),
    },
    cardStyle: { backgroundColor: "#0C387D" },
  },
  {
    id: "wallet-card-62",
    variant: "expandableCard",
    pass: {
      id: "pe-705",
      airline: "Pacific Eight",
      flightNumber: "PE 705",
      originCode: "JFK",
      originCity: "New York",
      departureTime: "09:15",
      destinationCode: "SIN",
      destinationCity: "Singapore",
      arrivalTime: "16:40 +1",
      boardingTime: "08:35",
      terminal: "8",
      gate: "A18",
      passengerName: "T. HONDA",
      seat: "5A",
      barcode: require("./images/pdf417-pe705.png"),
    },
    cardStyle: { backgroundColor: "#1A6BB3" },
  },
];
