import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import BoardContainer from "./components/BoardContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" component={BoardContainer} />
        <Route path="/:boardId/:boardName" component={Board} />
      </Router>
    </React.Fragment>
  );
}

export default App;
