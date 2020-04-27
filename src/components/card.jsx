import React from "react";
import "../css/list.css";

function Card(props) {
  return (
    <div className="card">
      <div
        className="card-body"
        data-cardid={props.card.id}
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
