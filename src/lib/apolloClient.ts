import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { API_BASE_URL } from "../constants/config";

const productsLink = new HttpLink({
  uri: `${API_BASE_URL}/product`,
});

const orderLink = new HttpLink({
  uri: `${API_BASE_URL}/order`,
});

const link = ApolloLink.split(
  (operation) => operation.getContext().clientName === "order",
  orderLink,
  productsLink
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
