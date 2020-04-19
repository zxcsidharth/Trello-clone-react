import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Board from "./components/Board";
import Nav from "./components/Nav";

function App() {
  return (
    <React.Fragment>
      <Nav value={"header"} />
      <Board />
    </React.Fragment>
  );
}

export default App;
