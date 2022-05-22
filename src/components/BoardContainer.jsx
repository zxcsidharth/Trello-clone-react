import React, { useState, useEffect } from "react";
import BoardsListCard from "./BoardsListCard";
import "../css/boardContainer.css";
import Nav from "./Nav";
import ModalForCreateBoard from "./ModalForCreateBoard";
import { connect } from "react-redux";
import { fetchBoards, createBoard } from "../actions/actionOnBoardContainer";

function BoardContainer(props) {
  const [createBoardPopUp, showModal] = useState(false);
  const [boardInputText, setBoardInputText] = useState("");

  useEffect(() => {
    props.fetchBoards();
  }, []);

  const showCreateBoardModal = () => {
    showModal(true);
  };
  const handleCancelbtn = () => {
    showModal(false);
  };
  const handleInputChange = (e) => {
    setBoardInputText(e.target.value);
  };

  console.log(props.boards);
  return (
    <React.Fragment>
      <Nav />
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
              {props.boards.map((board) => (
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
                onClick={showCreateBoardModal}
              >
                <h6 className="card-title">Create new board</h6>
              </div>
            </div>
          </div>
        </div>
        {createBoardPopUp ? (
          <ModalForCreateBoard
            onAddBoard={() => {
              props.createBoard(boardInputText);
              handleCancelbtn();
            }}
            oncancelBoardBtn={handleCancelbtn}
            onInputText={handleInputChange}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
  };
};

export default connect(mapStateToProps, { fetchBoards, createBoard })(
  BoardContainer
);
