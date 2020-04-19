import React, { Component } from "react";
import "../css/board.css";
import List from "./List";
import { APIkey, token, board_id, base_url } from "../constant";
import Textarea from "./Textarea";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      showTextArea: false,
      inputListName: "",
    };
  }
  componentDidMount() {
    let url = `${base_url}/boards/${board_id}/lists?key=${APIkey}&token=${token}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("fetched List ");
        this.setState({ lists: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  handleShowtextArea = () => {
    this.setState({ showTextArea: true });
  };
  handleCancelBtn = () => {
    this.setState({ showTextArea: false });
  };
  handleInputValue = (e) => {
    this.setState({ inputListName: e.target.value });
  };
  handleAddList = () => {
    let url = `${base_url}/boards/${board_id}/lists?name=${this.state.inputListName}&key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let lists = [...this.state.lists];
        lists.push(data);
        this.setState({ lists: lists, showTextArea: false });
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  deleteList = (listId) => {
    let url = `{}`;
  };
  render() {
    // const lists = this.state.lists;
    return (
      <div className="boards">
        <nav className="navbar bg-transparent board-nav">
          <h6>Board Name</h6>
        </nav>
        <div className="all-lists">
          {this.state.lists.map((list) => (
            <List
              key={list.id}
              listId={list.id}
              listName={list.name}
              onDeleteList={this.deleteList}
            />
          ))}
          <div className="add-list">
            {this.state.showTextArea === true ? (
              <Textarea
                value={this.state.inputListName}
                onCancelBtn={this.handleCancelBtn}
                onAddBtn={this.handleAddList}
                onTextarea={this.handleInputValue}
              />
            ) : (
              <button id="addAnotherList" onClick={this.handleShowtextArea}>
                <span className="add-symbol mr-1">+</span>Add Another List
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
