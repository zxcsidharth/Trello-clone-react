import React from "react";
import { Link } from "react-router-dom";
import "../css/boardContainer.css";
import { APIkey, token } from "../constant";
function BoardsListCard(props) {
  return (
    <Link
      to={`/${props.id}/${props.boardName}`}
      style={{ color: "#fff", textDecoration: "none" }}
    >
      <div
        className="boards-card-container mr-3 mb-3 rounded"
        style={{
          width: "180px",
          backgroundImage: `url(${props.image}?key=${APIkey}&token=${token})`,
          backgroundColor: `${props.color}`,
        }}
      >
        <h6 className="card-title p-2">{props.boardName}</h6>
      </div>
    </Link>
  );
}

export default BoardsListCard;
