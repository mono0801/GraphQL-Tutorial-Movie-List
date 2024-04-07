import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import client from "./client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // client를 <ApolloProvider> 내의 모든 컴포넌트가 접근하게 해준다
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
