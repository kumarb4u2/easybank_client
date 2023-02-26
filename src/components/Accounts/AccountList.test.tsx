import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccountList } from "./AccountList";
import { Account } from "../../types/account.type";

describe("AccountList", () => {
  test("should render without errors", async () => {
    const accounts: Account[] = [
      {
        accountNumber: "22656314",
        accountType: "Regular",
        balance: "123",
        transactions: [
          {
            id: "1078943",
            description:
              "withdrawal transaction at Rempel, Emmerich and Jast using card ending with ***(...2377) for CRC 111.54 in account ***05843770",
            transactionType: "deposit",
            date: "1674595165246",
            amount: "389.26",
          },
          {
            id: "1077370",
            description:
              "invoice transaction at Stoltenberg, Wintheiser and Stoltenberg using card ending with ***(...0615) for JMD 714.07 in account ***95827624",
            transactionType: "invoice",
            date: "1650097634500",
            amount: "558.52",
          },
        ],
      },
    ];
    render(<AccountList accounts={accounts} />);
    expect(screen.getByText("22656314")).toBeInTheDocument();
  });

  test("should render 0 balance if balance is not present in response", async () => {
    const accounts: Account[] = [
      {
        accountNumber: "22656314",
        accountType: "Regular",
        transactions: [
          {
            id: "1078943",
            description:
              "withdrawal transaction at Rempel, Emmerich and Jast using card ending with ***(...2377) for CRC 111.54 in account ***05843770",
            transactionType: "deposit",
            date: "1674595165246",
            amount: "389.26",
          },
          {
            id: "1077370",
            description:
              "invoice transaction at Stoltenberg, Wintheiser and Stoltenberg using card ending with ***(...0615) for JMD 714.07 in account ***95827624",
            transactionType: "invoice",
            date: "1650097634500",
            amount: "558.52",
          },
        ],
      },
    ];
    render(<AccountList accounts={accounts} />);
    expect(screen.getByText("Balance: 0")).toBeInTheDocument();
  });
});
