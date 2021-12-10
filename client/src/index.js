import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import AppProvider from "./components/AppProvider";

ReactDOM.render(
  <Auth0Provider
    domain="dev-1lgpnsg2.us.auth0.com"
    clientId="h9bdye8NeOZtBM8Atdgx4wUZVEsnC9tk"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <AppProvider>
      <App />
    </AppProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
