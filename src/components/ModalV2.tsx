import React, { Component, useEffect, useState } from "react";
import "../css/modalV2.css";
import "bootstrap/dist/css/bootstrap.css";
import Textarea from "./Textarea";
import CheckList from "./CheckList";
import {
  fetchChecklist,
  addChecklist,
  deleteChecklist,
} from "../actions/actionOnCards";
import { connect } from "react-redux";
import SidebarMenu from "./CardDetail/Sidebar";
import EditorBox from "./EditorBox";


interface ModalProps {
  fetchChecklist: (arg0: string) => Promise<void>;
  cardId: string; 
  cardName: string; 
  onClickOutsideModal: () => void;
  addChecklist: (arg0: string, arg1: string) => Promise<void>;
  checklists: [];
  deleteChecklist: (arg0: string, arg1: string) => Promise<void>;
}
interface ModalStates {
  showTextArea: boolean,
  inputCheckListValue: string
}
function ModalV2({fetchChecklist,
    cardId,
    cardName,
    onClickOutsideModal,
    addChecklist,
    checklists,
    deleteChecklist}: ModalProps) {

        // const [showTextArea, setShowTextArea] = useState<boolean>(false);
        // const [inputCheckListValue, setInputCheckListValue] = useState<string>("");

        const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
        const [descriptionText, setDescriptionText] = useState('');
        const [commentText, setCommentText] = useState('');
        const [commentEditor, showCommentEditor] = useState<boolean>(false);
      
        const handleDescriptionClick = () => {
          setIsDescriptionEditing(true);
        };

        useEffect(() => {
            fetchChecklist(cardId);
        }, [cardId]);

        // const showTextAreaComponent = () => {
        //     setShowTextArea(true);
        // }

        // const handleCancelBtn = () => {
        //     setShowTextArea(false);
        // }

        // const handleAddChecklistInput = (e: { target: { value: any; }; }) => {
        //     setInputCheckListValue(e.target.value);
        // }
        const handleOnClickComment = () => {
          showCommentEditor(true);
        }

    return (
        <div className="custom-modal-overlay" onClick={onClickOutsideModal}>
      <div className="custom-modal-container">
        {/* Header */}
        <div className="custom-modal-header">
<div className="svg-wrapper-title">
        <svg width={'16px'} height={'16px'} fill="none" viewBox="0 0 16 16" role="presentation"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" clip-rule="evenodd"></path></svg>

</div>
          <p className="modal-title-text">
            Also take your existing trello project and take it to level of deployment by using CI/CD pipeline.
          </p>
          <button className="custom-modal-close" onClick={onClickOutsideModal}>&times;</button>
        </div>

        {/* Body */}
        <div className="custom-modal-body">
          {/* Main Content */}
          <div className="custom-modal-main">
            {/* List Status */}
      <div className="list-status">
        in list <span className="list-badge">DOING/TO DO <i className="fa fa-chevron-down"></i></span>
      </div>

      {/* Notifications */}
      <div className="notifications-section">
        <h3 className="module-title notification">Notifications</h3>
        <div className="watch-button">
          <i className="fa fa-eye"></i>
          <span>Watch</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <div className="header-section">
          <i className="fa fa-align-left section-icon" style={{fontSize: '20px', padding: '4px 4px'}}></i>
          <h3 className="module-title">Description</h3>
        </div>

        {!isDescriptionEditing ? (
          <div 
            className="description-placeholder"
            onClick={handleDescriptionClick}
          >
            Add a more detailed description...
          </div>
        ) : (
          <div className="description-wrapper">
            <EditorBox setIsDescriptionEditing={setIsDescriptionEditing}/>
          </div>
        )}
      </div>

      {/* Activity Section */}
      <div className="activity-section">
        <div className="header-section">
          <i className="fa fa-list section-icon" style={{fontSize: '20px', padding: '4px 4px'}}></i>
          <h3 className="module-title">Activity</h3>
          <div className="show-details">Show details</div>
        </div>

        {/* Comment Input */}
        <div className="comment-section">
          <div className="avatar">SS</div>
          {commentEditor ? <EditorBox setIsDescriptionEditing={showCommentEditor} /> : <div style={{width: '100%'}} onClick={handleOnClickComment}><input 
            type="text" 
            className="comment-input"
            placeholder="Write a comment..."
          /></div>}
        </div>

        {/* Activity Item */}
        <div className="activity-item">
          <div className="avatar">SS</div>
          <div className="activity-content">
            <div className="activity-text">
              <strong>Sidharth Shankar</strong> added this card to doing/to do
            </div>
            <div className="activity-time">14 Jun 2021, 19:28</div>
          </div>
        </div>
      </div>
          </div>

          {/* Sidebar */}
            <SidebarMenu />
        </div>
      </div>
    </div>
  );
  }

const mapStateToProps = (state: { checklist: { checklists: any; }; }) => {
  return {
    checklists: state.checklist.checklists,
  };
};
export default connect(mapStateToProps, {
  fetchChecklist,
  addChecklist,
  deleteChecklist,
})(ModalV2);
