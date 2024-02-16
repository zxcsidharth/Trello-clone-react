import React, { Component } from "react";

interface CheckItemsProp {
  itemStates: string,
  onCheckBoxUpdate: (arg0: string, arg1: string) => void,
  handleUpdate: (arg0: string) => void,
  itemName: string,
  showUpdateFields: boolean,
  id: string,
  clickedItemId: string,
  inputValueChange: (arg0: any) => void,
  onUpdate: (arg0: string) => void,
  onDelete: (arg0: string) => void,
  onCancelBtn: () => void,
}
interface CheckItemState {
  showTextArea: boolean,
      updateItemInputValue: string,
}
class CheckItems extends Component <CheckItemsProp, CheckItemState> {
  constructor(props: CheckItemsProp) {
    super(props);
    this.state = {
      showTextArea: false,
      updateItemInputValue: "",
    };
  }

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
              onChange={this.props.inputValueChange}
            />
            <button
              type="button"
              className="btn btn-success mr-2"
              onClick={() => this.props.onUpdate(this.props.id)}
            >
              Update
            </button>
            <button
              className="btn btn-secondary delete-checkItem mr-2"
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
