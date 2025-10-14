import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

const productsLink = new HttpLink({ uri: "http://localhost:8000/product" });
const orderLink = new HttpLink({ uri: "http://localhost:8000/order" });

const link = ApolloLink.split(
    (operation) => operation.getContext().clientName === "order",
    orderLink,
    productsLink,
);

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});
