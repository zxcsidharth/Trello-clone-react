import React, { Component } from "react";
import CheckItems from "./CheckItems";
import ProgressBar from "./ProgressBar";
import "../css/checkItems.css";
import Textarea from "./Textarea";
import {
  getCheckItems,
  addCheckItem,
  deleteCheckitem,
  updateCheckItem,
  markCheckUncheck,
} from "../actions/actionOnChecklist";
import { connect } from "react-redux";

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextArea: false,
      checkItemsInputForUpdate: "",
      checkItemId: "",
      showAddItemTextArea: false,
      addItemsInputValue: "",
      checkedItemCount: 0,
    };
  }
  componentDidMount() {
    this.props.getCheckItems(this.props.checkItems, this.props.checkListId);
  }
  showTextAreaField = (itemId) => {
    this.setState({ showTextArea: true, checkItemId: itemId });
  };
  handleCancelBtn = () => {
    this.setState({ showTextArea: false });
  };
  changeUpdateInputValue = (e) => {
    this.setState({ checkItemsInputForUpdate: e.target.value });
  };
  handleAddItems = () => {
    this.setState({ showAddItemTextArea: true });
  };
  textareaValueChange = (e) => {
    this.setState({ addItemsInputValue: e.target.value });
  };
  addItemsTextAreaCancelBtn = () => {
    this.setState({ showAddItemTextArea: false });
  };

  render() {
    return (
      <div className="checklist-container">
        <div className="checklist-content">
          <div className="checklist-header">
            <p className="checklist-title">{this.props.checklistTitle}</p>
            <button
              className="button delete-checklist"
              onClick={() => this.props.onDelete(this.props.checkListId)}
            >
              delete
            </button>
          </div>
          {this.props.checkitems[this.props.checkListId] !== undefined ? (
            <ProgressBar
              itemCount={this.props.checkitems[this.props.checkListId].length}
              checkItems={this.props.checkitems[this.props.checkListId]}
              checkedItemCount={this.state.checkedItemCount}
            />
          ) : null}
          {this.props.checkitems[this.props.checkListId] &&
            this.props.checkitems[this.props.checkListId].map((checkitem) => (
              <CheckItems
                key={checkitem.id}
                itemName={checkitem.name}
                itemStates={checkitem.state}
                id={checkitem.id}
                clickedItemId={this.state.checkItemId}
                showUpdateFields={this.state.showTextArea}
                handleUpdate={this.showTextAreaField}
                onUpdate={(itemId) => {
                  this.props.updateCheckItem(
                    this.props.cardId,
                    itemId,
                    this.state.checkItemsInputForUpdate
                  );
                  this.handleCancelBtn();
                }}
                inputValueChange={this.changeUpdateInputValue}
                onDelete={(itemId) => {
                  this.props.deleteCheckitem(itemId, this.props.checkListId);
                }}
                onCancelBtn={this.handleCancelBtn}
                onCheckBoxUpdate={(itemId, itemState) =>
                  this.props.markCheckUncheck(
                    this.props.cardId,
                    itemId,
                    itemState
                  )
                }
              />
            ))}
        </div>
        {this.state.showAddItemTextArea ? (
          <Textarea
            onTextarea={this.textareaValueChange}
            onAddBtn={() => {
              this.props.addCheckItem(
                this.props.checkListId,
                this.state.addItemsInputValue
              );
              this.addItemsTextAreaCancelBtn();
            }}
            onCancelBtn={this.addItemsTextAreaCancelBtn}
          />
        ) : (
          <button
            className="button add-items mt-3"
            onClick={this.handleAddItems}
          >
            Add item
          </button>
        )}
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  return { checkitems: state.checkitem.checkitems };
};
export default connect(mapStateToprops, {
  getCheckItems,
  addCheckItem,
  deleteCheckitem,
  updateCheckItem,
  markCheckUncheck,
})(CheckList);
