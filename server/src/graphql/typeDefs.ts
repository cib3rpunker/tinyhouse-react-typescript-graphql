import { gql } from "apollo-server-express"
//import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Listing {
    id: ID!,
    title: String!,
    image: String!,
    address: String!,
    price: Int!
    numOfGuests: Int!,
    numOfBeds: Int!
    numsOfBaths: Int!
    rating: Int!
  }

  type Query{
    listings: [Listing!]!
  }

  type Mutation{
    deleteListing(id: ID!): Listing!
  }

`