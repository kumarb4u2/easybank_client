import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Transactions from "./Transactions";
import { Transaction } from "../../types/transaction.type";

describe("Transactions", () => {
  test("should render the transactions passed", async () => {
    const transactions: Transaction[] = [
      {
        id: "1231",
        date: "1659038910220",
        transactionType: "Debit",
        amount: "1000",
        description: "Electricity bill",
      },
      {
        id: "1232",
        date: "1659038910112",
        transactionType: "Credit",
        amount: "1200",
        description: "Payment towards loan",
      },
    ];
    render(<Transactions transactions={transactions} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("row")).toBeInTheDocument();
    expect(screen.getByText("Electricity bill")).toBeInTheDocument();
  });
});
