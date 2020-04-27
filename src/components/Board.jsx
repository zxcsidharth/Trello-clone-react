import React, { Component } from "react";
import "../css/board.css";
import List from "./List";
import { APIkey, token } from "../constant";
import Textarea from "./Textarea";
import Nav from "./Nav";
import { connect } from "react-redux";
import { fetchLists, createLists, deleteList } from "../actions/actionOnBoard";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextArea: false,
      inputListName: "",
      showBoardModal: false,
    };
  }
  componentDidMount() {
    this.props.fetchLists(this.props.match.params.boardId);
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
  showBoardModals = () => {
    this.setState({ showBoardModal: true });
  };
  render() {
    console.log(this.props.boards);
    let color = "";
    let image = "";
    for (let board of this.props.boards) {
      if (board.id === this.props.match.params.boardId) {
        board.prefs.backgroundImage
          ? (image = `${board.prefs.backgroundImage}?key=${APIkey}&token=${token}`)
          : (color = board.prefs.backgroundColor);
        break;
      }
    }
    console.log(color, image);
    return (
      <div
        className="boards"
        style={{
          backgroundColor: `${color}`,
          backgroundImage: `url(${image})`,
        }}
      >
        <Nav showBoardModals={this.showAllBoardModals} />
        <nav className="navbar bg-transparent board-nav">
          <div style={{ display: "flex" }}>
            <h5>{this.props.match.params.boardName}</h5>
            <button className="navBtn trello-Boards mb-3 ml-3">
              <i className="fa fa-star-o"></i>
            </button>
          </div>
          <div className="board-header">
            <button className="navBtn trello-Boards mb-3 ml-1">
              <i className="fa fa-star-o"></i> Butler
            </button>
            <button className="navBtn trello-Boards mb-3 ml-1">
              <i className="fa fa-slack"></i> Slack
            </button>
            <button className="navBtn trello-Boards mb-3 ml-1">
              <i className="fa fa-ellipsis-h mr-2"></i> Show Menu
            </button>
          </div>
        </nav>
        <div className="all-lists">
          {this.props.lists.map((list) => (
            <List
              key={list.id}
              listId={list.id}
              listName={list.name}
              onDeleteList={() => this.props.deleteList(list.id)}
            />
          ))}
          <div className="add-list">
            {this.state.showTextArea === true ? (
              <Textarea
                value={this.state.inputListName}
                onCancelBtn={this.handleCancelBtn}
                onAddBtn={() => {
                  this.props.createLists(
                    this.state.inputListName,
                    this.props.match.params.boardId
                  );
                  this.handleCancelBtn();
                }}
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

const mapStateToProps = (state) => {
  return {
    lists: state.list.lists,
    boards: state.board.boards,
  };
};

export default connect(mapStateToProps, {
  fetchLists,
  createLists,
  deleteList,
})(Board);
