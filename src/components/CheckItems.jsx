import React, { Component } from "react";
import TextFieldForitems from "./TextFieldForItems";

class CheckItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextArea: false,
      updateItemInputValue: "",
    };
  }
  handleTextAreaValue = (e) => {
    this.setState({ updateItemInputValue: e.target.value });
  };
  handleUpdateItems = () => {};
  handleDeleteItems = () => {};
  handleCancelBtn = () => {
    this.setState({ showTextArea: false });
  };
  render() {
    return (
      <div className="form-check">
        {this.props.itemStates === "complete" ? (
          <React.Fragment>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              defaultChecked
              onClick={() =>
                this.props.onCheckBoxUpdate(this.props.id, "incomplete")
              }
            />
            <label
              className="form-check-label"
              onClick={() => this.props.handleUpdate(this.props.id)}
            >
              <del>{this.props.itemName}</del>
            </label>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              onClick={() =>
                this.props.onCheckBoxUpdate(this.props.id, "complete")
              }
            />
            <label
              className="form-check-label"
              onClick={() => this.props.handleUpdate(this.props.id)}
            >
              {this.props.itemName}
            </label>
          </React.Fragment>
        )}
        {this.props.showUpdateFields &&
        this.props.id === this.props.clickedItemId ? (
          <div className="update-item-area mt-2 mb-3">
            <input
              className="form-control checkItem mb-2"
              type="text"
              onChange={this.props.textAreaChange}
            />
            <button
              type="button"
              className="btn btn-success mr-2"
              onClick={() => this.props.onUpdate(this.props.id)}
            >
              Update
            </button>
            <button
              className="btn btn-secondary delete-checkItem"
              type="button"
              onClick={() => this.props.onDelete(this.props.id)}
            >
              Delete Item
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.onCancelBtn}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CheckItems;
