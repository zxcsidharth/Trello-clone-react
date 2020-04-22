import React, { Component } from "react";
import "../css/modal.css";
import "bootstrap/dist/css/bootstrap.css";
import Textarea from "./Textarea";
import {
  APIkey,
  token,
  board_id,
  list_id,
  list_name,
  base_url,
} from "../constant";
import CheckList from "./CheckList";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLists: [],
      showTextArea: false,
      inputCheckListValue: "",
    };
  }

  componentDidMount() {
    let url = `${base_url}cards/${this.props.cardDetail.id}/checklists?key=${APIkey}&token=${token}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("successfully fetched");
        this.setState({ checkLists: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  showTextAreaComponent = () => {
    this.setState({ showTextArea: true });
  };
  handleCancelBtn = () => {
    this.setState({ showTextArea: false });
  };
  handleAddChecklistInput = (e) => {
    this.setState({ inputCheckListValue: e.target.value });
  };
  handleAddChecklist = () => {
    let url = `${base_url}cards/${this.props.cardDetail.id}/checklists?name=${this.state.inputCheckListValue}&key=${APIkey}&token=${token}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let newChecklist = [...this.state.checkLists];
        newChecklist.push(data);
        this.setState({ showTextArea: false, checkLists: newChecklist });
        console.log("Success:", data.name);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  deleteCheckList = (checkListId) => {
    let url = `${base_url}cards/${this.props.cardDetail.id}/checklists/${checkListId}?key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newChecklist = this.state.checkLists.filter((checklistObj) => {
          return checklistObj.id !== checkListId;
        });
        this.setState({ checkLists: newChecklist });
        console.log("Successfully removed");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const cardDetail = this.props.cardDetail;
    return (
      <div
        className="modal d-block"
        id="modalForCards"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={this.props.onClickOutsideModal}
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                {cardDetail.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={this.props.onClickOutsideModal}
              >
                &times;
              </button>
            </div>
            <div className="modal-body" id="modalBody">
              {!this.state.showTextArea ? (
                <button id="checklistBtn" onClick={this.showTextAreaComponent}>
                  Checklist
                </button>
              ) : (
                <Textarea
                  value={this.state.inputCheckListValue}
                  onTextarea={this.handleAddChecklistInput}
                  onAddBtn={this.handleAddChecklist}
                  onCancelBtn={this.handleCancelBtn}
                />
              )}
              {this.state.checkLists.map((checklistObj) => (
                <CheckList
                  key={checklistObj.id}
                  checklistTitle={checklistObj.name}
                  checkItems={checklistObj.checkItems}
                  checkListId={checklistObj.id}
                  cardId={this.props.cardDetail.id}
                  onDelete={this.deleteCheckList}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
