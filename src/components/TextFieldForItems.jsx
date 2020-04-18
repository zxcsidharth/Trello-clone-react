import React from "react";
import "../css/textArea.css";

function TextFieldForItems(props) {
  return (
    <div className="update-item-area mt-2">
      <input class="form-control checkItem" type="text" />
      <button
        type="button"
        className="btn btn-success mr-2"
        onClick={props.onUpdate}
      >
        Update
      </button>
      <button
        className="btn btn-secondary delete-checkItem"
        type="button"
        onClick={props.onDelete}
      >
        Delete Item
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
export default TextFieldForItems;
