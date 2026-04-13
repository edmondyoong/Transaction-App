import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Documentation from "./components/Documentation";
import Error from "./components/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <NavLinks />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Documentation" component={Documentation} />
          <Route component={Error}></Route>
        </Switch>
    </Router>
  );
}

export default App;
