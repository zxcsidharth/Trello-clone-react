import React from "react";
import logo from "../Trello_logo.png";
import { Link } from "react-router-dom";
import "../css/nav.css";
function Nav(props) {
  return (
    <nav className="navbar ">
      <div className="first-part">
        <button className="navBtn trello-products mb-3">
          <i className="fa fa-ellipsis-v"></i>
          <i className="fa fa-ellipsis-v"></i>
          <i className="fa fa-ellipsis-v"></i>
        </button>
        <Link to="/">
          <button className="navBtn trello-home mb-3 ml-1">
            <i className="fa fa-home"></i>
          </button>
        </Link>
        <button
          className="navBtn trello-Boards mb-3 ml-1"
          onClick={props.showBoardModals}
        >
          <i className="fa fa-trello mr-1"></i>
          <span>Boards</span>
        </button>
        <div className="search-box mb-3 ml-1">
          <input type="text" className="form-control-inline input" />
          <button className="navBtn trello-search">
            <i className="fa fa-search mr-1"></i>
          </button>
        </div>
      </div>
      <div className="navbar-brand">
        <Link to="/">
          <img
            src={logo}
            width="60"
            height="50"
            alt="trello logo"
            style={{ marginRight: "10em" }}
          />
        </Link>
      </div>
      <div>
        <button className="navBtn trello-plus mb-3 ml-1">
          <i className="fa fa-plus"></i>
        </button>
        <button className="navBtn trello-info mb-3 ml-1">
          <i className="fa fa-info-circle"></i>
        </button>
        <button className="navBtn trello-notification mb-3 ml-1">
          <i className="fa fa-bell"></i>
        </button>
        <button className="trello-account mb-3 ml-1">SS</button>
      </div>
    </nav>
  );
}

export default Nav;
