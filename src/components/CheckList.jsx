import React, { Component } from "react";
import CheckItems from "./CheckItems";
import ProgressBar from "./ProgressBar";
import "../css/checkItems.css";
import {
  APIkey,
  token,
  board_id,
  list_id,
  list_name,
  base_url,
} from "../constant";
import Textarea from "./Textarea";

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItem: [],
      showTextArea: false,
      checkItemsInputForUpdate: "",
      checkItemId: "",
      showAddItemTextArea: false,
      addItemsInputValue: "",
      checkedItemCount: 0,
    };
  }
  componentDidMount() {
    this.setState({ checkItem: this.props.checkItems });
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
  handleUpdateItems = (itemId) => {
    if (this.state.checkItemsInputForUpdate.length > 0) {
      let url = `${base_url}cards/${this.props.cardId}/checkItem/${itemId}?name=${this.state.checkItemsInputForUpdate}&key=${APIkey}&token=${token}`;
      console.log(url);
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data.name);
          let updatedItem = [...this.state.checkItem];
          updatedItem = updatedItem.map((item) => {
            return item.id === data.id ? data : item;
          });
          this.setState({
            checkItem: updatedItem,
            showTextArea: false,
            checkItemsInputForUpdate: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
    }
  };
  handleDeleteItems = (itemId) => {
    let url = `${base_url}checklists/${this.props.checkListId}/checkItems/${itemId}?key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newCheckItem = this.state.checkItem.filter((item) => {
          return itemId !== item.id;
        });
        this.setState({ checkItem: newCheckItem, showTextArea: false });
        console.log("Successfully removed");
      })
      .catch((error) => {
        console.log(error.message);
      });

    console.log();
  };
  handleCheckedunChecked = (itemId, itemState) => {
    let url = `${base_url}cards/${this.props.cardId}/checkItem/${itemId}?state=${itemState}&key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedItem = this.state.checkItem.map((items) => {
          return items.id === itemId ? data : items;
        });
        this.setState({ checkItem: updatedItem });
        console.log("Success:", data.state);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  handleAddItems = () => {
    this.setState({ showAddItemTextArea: true });
  };
  textareaValueChange = (e) => {
    this.setState({ addItemsInputValue: e.target.value });
  };
  addchecklistItems = () => {
    let url = `${base_url}checklists/${this.props.checkListId}/checkItems?name=${this.state.addItemsInputValue}&key=${APIkey}&token=${token}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let newCheckItems = [...this.state.checkItem];
        newCheckItems.push(data);
        this.setState({
          checkItem: newCheckItems,
          showAddItemTextArea: false,
          addItemsInputValue: "",
        });
        console.log("Success:", data.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  addItemsTextAreaCancelBtn = () => {
    this.setState({ showAddItemTextArea: false });
  };
  findCheckedItem = () => {
    console.log(this.state.checkItem);
    let itemCountCheck = 0;
    this.state.checkItem.forEach((item) => {
      if (item.state === "complete") {
        itemCountCheck++;
      }
    });
    console.log(itemCountCheck, this.state.checkedItemCount);
    this.setState({ checkedItemCount: itemCountCheck });
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
          <ProgressBar
            itemCount={this.state.checkItem.length}
            checkItems={this.state.checkItem}
            checkedItemCount={this.state.checkedItemCount}
          />
          {this.state.checkItem.map((checkitem) => (
            <CheckItems
              key={checkitem.id}
              itemName={checkitem.name}
              itemStates={checkitem.state}
              id={checkitem.id}
              clickedItemId={this.state.checkItemId}
              showUpdateFields={this.state.showTextArea}
              handleUpdate={this.showTextAreaField}
              onUpdate={this.handleUpdateItems}
              inputValueChange={this.changeUpdateInputValue}
              onDelete={this.handleDeleteItems}
              onCancelBtn={this.handleCancelBtn}
              onCheckBoxUpdate={this.handleCheckedunChecked}
            />
          ))}
        </div>
        {this.state.showAddItemTextArea ? (
          <Textarea
            onTextarea={this.textareaValueChange}
            onAddBtn={this.addchecklistItems}
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

export default CheckList;
