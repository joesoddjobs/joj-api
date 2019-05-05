const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    pets(id: ID!): [Pet!]!
  }

  type Mutation {

  }

  type User {
    id: ID!
    email: String!
    name: String! 
    pets: PetsTypes
  }

  type Pet {
    userId: ID!
    color: ColorTypes
  }

  enum ColorTypes {
    ORANGE
    BLACK 
    WHITE 
    STRIPED
  }

  enum PetsTypes {
    CAT
    BIG CAT
    ANOTHER CAT
    SMALL CAT
  }
`
