import { gql } from "@apollo/client";

export const getAccounts = gql`
  query getAccounts($userName: String) {
    users(userName: $userName) {
      accounts {
        accountNumber
        accountType
        balance
        transactions {
          id
          description
          transactionType
          date
          amount
        }
      }
    }
  }
`;
