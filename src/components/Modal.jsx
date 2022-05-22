import React, { Component } from "react";
import "../css/modal.css";
import "bootstrap/dist/css/bootstrap.css";
import Textarea from "./Textarea";
import CheckList from "./CheckList";
import {
  fetchChecklist,
  addChecklist,
  deleteChecklist,
} from "../actions/actionOnCards";
import { connect } from "react-redux";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextArea: false,
      inputCheckListValue: "",
    };
  }

  componentDidMount() {
    this.props.fetchChecklist(this.props.cardId);
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

  render() {
    const { cardId, cardName } = this.props;
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
                {cardName}
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
                  onAddBtn={() => {
                    this.props.addChecklist(
                      cardId,
                      this.state.inputCheckListValue
                    );
                    this.handleCancelBtn();
                  }}
                  onCancelBtn={this.handleCancelBtn}
                />
              )}
              {this.props.checklists.map((checklistObj) => (
                <CheckList
                  key={checklistObj.id}
                  checklistTitle={checklistObj.name}
                  checkItems={checklistObj.checkItems}
                  checkListId={checklistObj.id}
                  cardId={cardId}
                  onDelete={(checklistId) =>
                    this.props.deleteChecklist(cardId, checklistId)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checklists: state.checklist.checklists,
  };
};
export default connect(mapStateToProps, {
  fetchChecklist,
  addChecklist,
  deleteChecklist,
})(Modal);
