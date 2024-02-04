import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { HashRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./store";
import { Provider } from "react-redux";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
);
