/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useMemo } from "react";
import "../css/board.css";
import List from "./List";
import { APIkey, token } from "../constant";
import Textarea from "./Textarea";
import Nav from "./Nav";
import { connect } from "react-redux";
import { fetchLists, createLists, deleteList } from "../actions/actionOnBoard";

interface BoardProps {
  fetchLists: (arg0: string) => void; 
  match: { 
    params: { 
      boardId: string; 
      boardName: string | undefined;
      }; 
    }
  boards: any; 
  lists: any[];
  deleteList: (arg0: string) => any; 
  createLists: (arg0: string, arg1: string) => void;
}

function Board(props: BoardProps) {
  const [textArea, showTextArea] = useState(false);
  const [inputListName, setInputListName] = useState("");

  useEffect(() => {
    props.fetchLists(props.match.params.boardId);
  }, []);
  const handleShowtextArea = () => {
    showTextArea(true);
  };
  const handleCancelBtn = () => {
    showTextArea(false);
  };
  const handleInputValue = (e: { target: { value: string }; }) => {
    setInputListName(e.target.value);
  };

  const prefrences = useMemo(() => {
    for (let board of props.boards) {
      if (board.id === props.match.params.boardId) {
        if (board.prefs.backgroundImage) {
          localStorage.setItem(
            "backgroundImage",
            `${board.prefs.backgroundImage}?key=${APIkey}&token=${token}`
          );
        } else {
          localStorage.setItem("backgroundColor", board.prefs.backgroundColor);
        }
        break;
      }
    }
    const image = localStorage.getItem("backgroundImage");
    const color = localStorage.getItem("backgroundColor");
    return { image, color };
  }, []);

  return (
    <div
      className="boards"
      style={{
        backgroundColor: `${prefrences?.color}`,
        backgroundImage: `url(${prefrences?.image})`,
      }}
    >
      <Nav />
      <nav className="navbar bg-transparent board-nav">
        <div style={{ display: "flex" }}>
          <h5>{props.match.params.boardName}</h5>
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
        {props.lists.map((list) => (
          <List
            key={list.id}
            listId={list.id}
            listName={list.name}
            onDeleteList={() => props.deleteList(list.id)}
          />
        ))}
        <div className="add-list">
          {textArea === true ? (
            <Textarea
            // buttonTitle={inputListName}
              onCancelBtn={handleCancelBtn}
              onAddBtn={() => {
                props.createLists(inputListName, props.match.params.boardId);
                handleCancelBtn();
              }}
              onTextarea={handleInputValue}
            />
          ) : (
            <button id="addAnotherList" onClick={handleShowtextArea}>
              <span className="add-symbol mr-1">+</span>Add Another List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { list: { lists: any; }; board: { boards: any; }; }) => {
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
