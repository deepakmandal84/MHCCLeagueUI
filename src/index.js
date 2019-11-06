import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import TeamRank from "./teamRanks";
import ManagerTeam from "./mainNav";

const Routing = (
  <Router>
    <div>
      <Route exact path="/" component={TeamRank} />
      <Route name="showTeams" path="/Team/:teamId" component={ManagerTeam} />
      <Route path="/Teams" component={TeamRank} />
    </div>
  </Router>
);
ReactDOM.render(Routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
