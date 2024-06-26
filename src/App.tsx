import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import { useState } from "react";

export const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Nested: {
        // merge: true,
      },
    },
  }),
});

export const QUERY_DATA_1 = gql`
  query foobar1 {
    foobar {
      id
      lastOnlineAt
      nested {
        value1
      }
    }
  }
`;

export const QUERY_DATA_2 = gql`
  query foobar2 {
    foobar {
      id
      lastOnlineAt
      nested {
        value2
      }
    }
  }
`;

function Component1() {
  const { data } = useQuery(QUERY_DATA_1, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return (
    <div>
      1: {data?.foobar.lastOnlineAt} {data?.foobar.nested.value1}
    </div>
  );
}

function Component2() {
  const { data } = useQuery(QUERY_DATA_2, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return (
    <div>
      2: {data?.foobar.lastOnlineAt} {data?.foobar.nested.value2}
    </div>
  );
}

export default function App() {
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  return (
    <ApolloProvider client={client}>
      <>
        <Component1 />
        {showSecondComponent && <Component2 />}
        <button onClick={() => setShowSecondComponent(!showSecondComponent)}>
          Toggle
        </button>
      </>
    </ApolloProvider>
  );
}
