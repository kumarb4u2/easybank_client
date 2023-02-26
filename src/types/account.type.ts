import { Transaction } from "./transaction.type";

export type Account = {
  accountNumber: string;
  accountType: string;
  balance?: string;
  transactions: Transaction[];
};
