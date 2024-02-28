import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    products {
      id
      title
      price
      rent
      rentType {
        id
        label
      }
      description
      createdAt
      categories {
        id
        name
      }
    }
  }
`;
export const ADD_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $price: Float!
    $rent: Float!
    $rentId: Int!
    $description: String!
    $categoryIds: [Int!]!
    $createdBy: Int!
  ) {
    createProduct(
      title: $title
      price: $price
      rent: $rent
      rentId: $rentId
      description: $description
      categoryIds: $categoryIds
      createdBy: $createdBy
    ) {
      id
      title
      price
      rent
      rentType {
        id
        label
      }
      description
      createdAt
      user {
        id
        email
      }
      categories {
        id
        name
      }
    }
  }
`;

export const GET_Categories = gql`
  query Query {
    categories {
      id
      name
    }
  }
`;
export const GET_Rentyps = gql`
  query Query {
    rentypes {
      id
      label
    }
  }
`;
export const EDIT = gql`
  mutation Mutation(
    $productId: Int!
    $title: String
    $description: String
    $rent: Float
    $price: Float
    $rentTypeId: Int
    $categoryIds: [Int!]
  ) {
    updateProduct(
      productId: $productId
      title: $title
      description: $description
      rent: $rent
      price: $price
      rentTypeId: $rentTypeId
      categoryIds: $categoryIds
    ) {
      id
      title
    }
  }
`;
export const GET_USER_PRODUCTS = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      products {
        id
        title
        price
        rent
        description
        createdAt
        categories {
          id
          name
        }
        rentType {
          id
          label
        }
      }
    }
  }
`;
export const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      firstName
      lastName
    }
  }
`;
export const GET_TRANSACTION_PRODUCTS = gql`
  query Query($userId: Int!) {
    transactionByUser(userId: $userId) {
      id
      product {
        title
        id
        price
        rent
        description
        rentType {
          id
          label
        }
        categories {
          id
          name
        }
      }
      type
    }
  }
`;
export const ADD_TRANSACTOION = gql`
  mutation Mutation(
    $userId: Int!
    $productId: Int!
    $type: String!
    $fromDate: String
    $toDate: String
  ) {
    addTransaction(
      userId: $userId
      productId: $productId
      type: $type
      fromDate: $fromDate
      toDate: $toDate
    ) {
      id
      user {
        id
        email
        firstName
        products {
          id
          title
          price
        }
      }
    }
  }
`;
export const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
      email
      firstName
      lastName
      password
      createdAt
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation Mutation($productId: Int!) {
    deleteProduct(productId: $productId) {
      id
      title
    }
  }
`;
