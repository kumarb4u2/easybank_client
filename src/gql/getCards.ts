import { gql } from "@apollo/client";

export const getCards = gql`
  query getCards($userName: String) {
    users(userName: $userName) {
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
