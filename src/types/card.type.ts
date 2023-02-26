import { Transaction } from "./transaction.type";

export type Card = {
  cardNumber: string;
  cardType: string;
  cvv: string;
  expiry: string;
  creditLimit?: string;
  annualCharges: string;
  transactions: Transaction[];
  cardCategory?: string;
};
