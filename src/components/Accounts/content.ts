import { RadioCardItem } from "../../types/RadioCardItem";

export const initialAccounts: RadioCardItem[] = [
  {
    name: "Regular account",
    description: "Minimum balance is 0",
    selected: false,
    type: "Regular",
  },
  {
    name: "Premium account",
    description: "Minimum balance is 10,000",
    selected: false,
    type: "Premium",
  },
];
