const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Foobar {
    id: ID!
    lastOnlineAt: String!
    nested: Nested!
  }

  type Nested {
    id: ID!
    value1: Int!
    value2: Int!
  }

  type Query {
    foobar: Foobar
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    foobar: () => ({
      id: "foobar",
      lastOnlineAt: new Date().toISOString(),
      nested: {
        id: 1,
        value1: 2,
        value2: 3,
      },
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
