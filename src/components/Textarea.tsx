import React, { ChangeEventHandler, MouseEventHandler } from "react";
import "../css/textArea.css";

interface PropTypes {
  onTextarea: ChangeEventHandler<HTMLTextAreaElement>;
  onCancelBtn: MouseEventHandler<HTMLButtonElement>;
  onAddBtn: () => void;
}
function Textarea(props: PropTypes) {
  return (
    <div className="create-textarea" id="titleSpace">
      <div className="form-group text-area mr-2">
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
        Add
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
