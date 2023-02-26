import { gql } from "@apollo/client";

export const getCardsAndAccounts = gql`
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
      cards {
        cardNumber
        cardType
        cvv
        expiry
        creditLimit
        annualCharges
        cardCategory
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
