import React, { Component } from "react";
import { APIkey, token, base_url } from "../constant";
import BoardsListCard from "./BoardsListCard";
import "../css/boardContainer.css";
import Nav from "./Nav";
import ModalForCreateBoard from "./ModalForCreateBoard";

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      showCreateBoardPopup: false,
      boardInputText: "",
    };
  }

  componentDidMount() {
    let url = `${base_url}members/me/boards?key=${APIkey}&token=${token}`;
    console.log(url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("successfully fetched");
        this.setState({ boards: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  showCreateBoardModal = () => {
    this.setState({ showCreateBoardPopup: true });
  };
  handleCancelbtn = () => {
    this.setState({ showCreateBoardPopup: false });
  };
  handleInputChange = (e) => {
    this.setState({ boardInputText: e.target.value });
  };
  createBoard = () => {
    let url = `${base_url}/boards?name=${this.state.boardInputText}&key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let board = [...this.state.boards];
        board.push(data);
        this.setState({ showCreateBoardPopup: false });
        this.setState({ boards: board });
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Nav value={"header"} />
        <div className="all-boards mt-5">
          <div className="row">
            <div className="col-md-2 offset-md-1">
              <button type="button" className="board-tab">
                <i className="fa fa-trello mr-2"></i>
                Boards
              </button>
            </div>
            <div className="col-md-8">
              <h4 className="board-types" style={{ color: "#172b4d" }}>
                <i className="fa fa-user mr-2"></i>Personal Boards
              </h4>
              <div className="board-cards">
                {this.state.boards.map((board) => (
                  <BoardsListCard
                    key={board.id}
                    boardName={board.name}
                    id={board.id}
                    image={board.prefs.backgroundImage}
                    color={board.prefs.backgroundColor}
                  />
                ))}

                <div
                  className="boards-card-container mr-3 mb-3 rounded"
                  style={{
                    width: "180px",
                    textAlign: "center",
                    paddingTop: "35px",
                    backgroundColor: "grey",
                    cursor: "pointer",
                  }}
                  onClick={this.showCreateBoardModal}
                >
                  <h6 className="card-title">Create new board</h6>
                </div>
              </div>
            </div>
          </div>
          {this.state.showCreateBoardPopup ? (
            <ModalForCreateBoard
              onAddBoard={this.createBoard}
              oncancelBoardBtn={this.handleCancelbtn}
              onInputText={this.handleInputChange}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default BoardContainer;
