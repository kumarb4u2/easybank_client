import { gql } from "@apollo/client";

export const applyCreditCard = gql`
  mutation applyCreditCard(
    $userName: String
    $cardCategory: String
    $income: String
  ) {
    applyCreditCard(
      userName: $userName
      cardCategory: $cardCategory
      income: $income
    ) {
      cards {
        cardType
      }
    }
  }
`;
