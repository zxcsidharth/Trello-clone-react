import React, { useState, useEffect } from "react";
import "../css/list.css";
import Card from "./card";
import Textarea from "./Textarea";
import Modal from "./Modal";
import { fetchCards, createCard, deleteCard } from "../actions/actionOnList";
import { connect } from "react-redux";

function List(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     visibleTextArea: false,
  //     inputCardTitle: "",
  //     showModal: false,
  //     cardDetails: { id: "", name: "" },
  //   };
  // }
  const [textArea, showTextArea] = useState(false);
  const [displayModal, showModal] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState("");
  const [cardDetails, setCardDetail] = useState({ id: "", name: "" });

  useEffect(() => {
    props.fetchCards(props.listId);
  }, []);
  const handleAddCards = (e) => {
    showTextArea(true);
  };
  const handleCancelBtn = () => {
    showTextArea(false);
  };
  const handleInputValue = (e) => {
    setInputCardTitle(e.target.value);
  };
  const handleModalClick = (cardDetail) => {
    let cardDet = { ...cardDetails };
    cardDet.id = cardDetail.id;
    cardDet.name = cardDetail.name;
    setCardDetail(cardDet);
    showModal(true);
  };
  const closeModal = () => {
    showModal(false);
  };

  return (
    <div className="jumbotron list">
      <div className="list-top">
        <p className="list-title ml-2 mt-1 pt-2">{props.listName}</p>
        <button
          className="button delete mt-2"
          style={{ marginRight: "0.7em" }}
          onClick={() => props.onDeleteList(props.listId)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
      <div className="card-container">
        {props.cards[props.listId] !== undefined &&
          props.cards[props.listId].map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={() => props.deleteCard(card.id, props.listId)}
              OnClickModal={handleModalClick}
            />
          ))}
      </div>
      <div className="list-bottom">
        {textArea === true ? (
          <Textarea
            value={inputCardTitle}
            onCancelBtn={handleCancelBtn}
            onAddBtn={() => {
              props.createCard(inputCardTitle, props.listId);
              handleCancelBtn();
            }}
            onTextarea={handleInputValue}
          />
        ) : (
          <button id="addAnotherCard" onClick={handleAddCards}>
            <span className="add-symbol mr-1">+</span>Add Another Card
          </button>
        )}
      </div>
      {displayModal ? (
        <Modal
          onClickOutsideModal={closeModal}
          cardId={cardDetails.id}
          cardName={cardDetails.name}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cards: state.card.cards,
  };
};

export default connect(mapStateToProps, { fetchCards, createCard, deleteCard })(
  List
);
