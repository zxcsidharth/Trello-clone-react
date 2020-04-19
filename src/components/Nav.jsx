import React from "react";
import logo from "../Trello_logo.png";
import "../css/nav.css";
function Nav(props) {
  const { value } = props;
  return (
    <nav className="navbar navbar-light bg-dark">
      <button className="navBtn trello-products">
        <i className="fa fa-ellipsis-h"></i>
      </button>
      <button className="navBtn trello-home">
        <i className="fa fa-home"></i>
      </button>
      <button className="navBtn trello-Boards">
        <i className="fa fa-trello"></i>
        <span>Boards</span>
      </button>
      {value === "header" ? (
        <a className="navbar-brand" href="../public/index.html">
          <img src={logo} width="60" height="50" alt="trello logo" />
        </a>
      ) : (
        <p className="text-white">{value}</p>
      )}
    </nav>
  );
}

export default Nav;
