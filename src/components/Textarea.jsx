import React from "react";
import "../css/textArea.css";

function Textarea(props) {
  console.log(props);
  return (
    <div className="create-textarea mt-2" id="titleSpace">
      <div className="form-group text-area">
        <textarea
          className="form-control"
          id="cardTitle"
          onChange={props.onTextarea}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-success mr-2"
        onClick={props.onAddBtn}
      >
        Add
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={props.onCancelBtn}
      >
        Cancel
      </button>
    </div>
  );
}
export default Textarea;
