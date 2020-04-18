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
        className="btn btn-light delete-card"
        onClick={() => props.onDelete(props.card.id)}
      >
        X
      </button>
    </div>
  );
}
export default Card;
