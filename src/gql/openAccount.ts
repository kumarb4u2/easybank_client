import { gql } from "@apollo/client";

export const openAccount = gql`
  mutation openAccount($userName: String, $accountType: String) {
    openAccount(userName: $userName, accountType: $accountType) {
      accounts {
        accountNumber
        accountType
        balance
      }
    }
  }
`;
