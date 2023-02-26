import { gql } from "@apollo/client";

export const getWelcomeModalStatus = gql`
  query getCards($userName: String) {
    users(userName: $userName) {
      showWelcomeModal
    }
  }
`;

export const updateWelcomeModal = gql`
  mutation updateWelcomeModal($userName: String, $welcomeModalSeen: Boolean) {
    updateWelcomeModal(
      userName: $userName
      welcomeModalSeen: $welcomeModalSeen
    ) {
      showWelcomeModal
    }
  }
`;
