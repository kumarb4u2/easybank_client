import { gql } from "@apollo/client";

export const logIn = gql`
  mutation logIn($userName: String, $password: String) {
    logIn(userName: $userName, password: $password) {
      userName
      name
      email
      mobile
      address
    }
  }
`;
