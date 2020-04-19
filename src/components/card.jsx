import React from "react";
import "../css/list.css";
// import "bootstrap/dist/css/bootstrap.css";

function Card(props) {
  return (
    <div className="card">
      <div
        className="card-body"
        data-cardid={props.card.id}
        data-toggle="modal"
        data-target="#modalForCards"
        onClick={() => props.OnClickModal(props.card)}
      >
        {props.card.name}
      </div>
      <button
        className="button delete"
        onClick={() => props.onDelete(props.card.id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
}
export default Card;
