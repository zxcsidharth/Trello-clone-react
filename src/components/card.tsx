import React from "react";
import "../css/list.css";

interface CardProps {
  card: { id: string; name: string}; 
  OnClickModal: (arg0: {id: string; name: string}) => void; 
  onDelete: (arg0: string) => Promise<void>;
}
function Card(props: CardProps) {
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
