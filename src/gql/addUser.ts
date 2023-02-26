import { gql } from '@apollo/client';

export const addUser = gql`
  mutation AddUser(
    $name: String
    $email: String
    $mobile: String
    $address: String
    $occupation: String
    $income: String
    $idProofNumber: String
    $userName: String
    $password: String
  ) {
    addUser(
      name: $name
      email: $email
      mobile: $mobile
      address: $address
      occupation: $occupation
      income: $income
      idProofNumber: $idProofNumber
      userName: $userName
      password: $password
    ) {
      id
      email
    }
  }
`;