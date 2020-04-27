import React, { Component } from "react";
import "../css/list.css";
import Card from "./card";
import Textarea from "./Textarea";
import Modal from "./Modal";
import { fetchCards, createCard, deleteCard } from "../actions/actionOnList";
import { connect } from "react-redux";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTextArea: false,
      inputCardTitle: "",
      showModal: false,
      cardDetails: { id: "", name: "" },
    };
  }
  componentDidMount() {
    this.props.fetchCards(this.props.listId);
  }
  handleAddCards = (e) => {
    this.setState({ visibleTextArea: true });
  };
  handleCancelBtn = () => {
    this.setState({ visibleTextArea: false });
  };
  handleInputValue = (e) => {
    this.setState({ inputCardTitle: e.target.value });
    console.log(this.state.inputCardTitle);
  };
  handleModalClick = (cardDetail) => {
    let cardDet = { ...this.state.cardDetails };
    cardDet.id = cardDetail.id;
    cardDet.name = cardDetail.name;
    this.setState({ cardDetails: cardDet, showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="jumbotron list">
        <div className="list-top">
          <p className="list-title ml-2 mt-1 pt-2">{this.props.listName}</p>
          <button
            className="button delete mt-2"
            style={{ marginRight: "0.7em" }}
            onClick={() => this.props.onDeleteList(this.props.listId)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
        <div className="card-container">
          {this.props.cards[this.props.listId] !== undefined &&
            this.props.cards[this.props.listId].map((card) => (
              <Card
                key={card.id}
                card={card}
                onDelete={() =>
                  this.props.deleteCard(card.id, this.props.listId)
                }
                OnClickModal={this.handleModalClick}
              />
            ))}
        </div>
        <div className="list-bottom">
          {this.state.visibleTextArea === true ? (
            <Textarea
              value={this.state.inputCardTitle}
              onCancelBtn={this.handleCancelBtn}
              onAddBtn={() => {
                this.props.createCard(
                  this.state.inputCardTitle,
                  this.props.listId
                );
                this.handleCancelBtn();
              }}
              onTextarea={this.handleInputValue}
            />
          ) : (
            <button id="addAnotherCard" onClick={this.handleAddCards}>
              <span className="add-symbol mr-1">+</span>Add Another Card
            </button>
          )}
        </div>
        {this.state.showModal ? (
          <Modal
            onClickOutsideModal={this.closeModal}
            cardId={this.state.cardDetails.id}
            cardName={this.state.cardDetails.name}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.card.cards,
  };
};

export default connect(mapStateToProps, { fetchCards, createCard, deleteCard })(
  List
);
