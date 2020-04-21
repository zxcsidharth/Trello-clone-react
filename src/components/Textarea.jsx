import React from "react";
import "../css/textArea.css";

function Textarea(props) {
  return (
    <div className="create-textarea" id="titleSpace">
      <div className="form-group text-area">
        <textarea
          className="form-control"
          id="cardTitle"
          onChange={props.onTextarea}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-success mr-1"
        onClick={props.onAddBtn}
      >
        Add {props.buttonTitle}
      </button>
      <button
        type="button"
        className="btn btn-cancel"
        onClick={props.onCancelBtn}
      >
        &times;
      </button>
    </div>
  );
}
export default Textarea;
