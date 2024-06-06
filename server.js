const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Foobar {
    id: ID!
    lastOnlineAt: String!
    nested: Nested!
  }

  type Nested {
    value1: String!
    value2: String!
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
        value1: 'value1',
        value2: 'value2',
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
