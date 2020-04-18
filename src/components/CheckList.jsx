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

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItem: [],
      showTextArea: false,
      checkItemsInputForUpdate: "",
      checkItemId: "",
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
  changetextAreaValue = (e) => {
    this.setState({ checkItemsInputForUpdate: e.target.value });
  };
  handleUpdateItems = (itemId) => {
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
        this.setState({ checkItem: updatedItem, showTextArea: false });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    console.log(url);
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
          <ProgressBar />
          {this.state.checkItem.map((checkitem) => (
            <CheckItems
              key={checkitem.id}
              itemName={checkitem.name}
              itemStates={checkitem.state} //use this way
              id={checkitem.id}
              clickedItemId={this.state.checkItemId}
              showUpdateFields={this.state.showTextArea}
              handleUpdate={this.showTextAreaField}
              onUpdate={this.handleUpdateItems}
              textAreaChange={this.changetextAreaValue}
              onDelete={this.handleDeleteItems}
              onCancelBtn={this.handleCancelBtn}
              onCheckBoxUpdate={this.handleCheckedunChecked}
            />
          ))}
        </div>
        <button className="button add-items mt-3">Add item</button>
      </div>
    );
  }
}

export default CheckList;
