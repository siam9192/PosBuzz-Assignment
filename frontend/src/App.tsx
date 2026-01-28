import React from "react";
import Provider from "./providers/Provider";
import Router from "./router";
import "./App.css";
const App: React.FC = () => (
  <Provider>
    <Router />
  </Provider>
);

export default App;
