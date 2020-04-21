import React, { Component } from "react";
import "../css/list.css";
import Card from "./card";
import {
  APIkey,
  token,
  board_id,
  list_id,
  list_name,
  base_url,
} from "../constant";
import Textarea from "./Textarea";
import Modal from "./Modal";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      visibleTextArea: false,
      inputCardTitle: "",
      showModal: false,
      cardDetails: {},
    };
  }
  componentDidMount() {
    let url = `${base_url}lists/${this.props.listId}/cards?key=${APIkey}&token=${token}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("successfully fetched");
        this.setState({ cards: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  handleAddCards = (e) => {
    this.setState({ visibleTextArea: true });
  };
  handleCancelBtn = () => {
    this.setState({ visibleTextArea: false });
  };
  handleAddToCard = () => {
    let url = `${base_url}cards?name=${this.state.inputCardTitle}&idList=${this.props.listId}&key=${APIkey}&token=${token}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let card = [...this.state.cards];
        card.push(data);
        this.setState({ visibleTextArea: false });
        this.setState({ cards: card });
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  handleInputValue = (e) => {
    this.setState({ inputCardTitle: e.target.value });
    console.log(this.state.inputCardTitle);
  };
  handleDeleteCard = (cardId) => {
    let url = `${base_url}cards/${cardId}?key=${APIkey}&token=${token}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedCards = this.state.cards.filter((card) => {
          return card.id !== cardId;
        });
        this.setState({ cards: updatedCards });
        console.log("Successfully removed");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  handleModalClick = (cardDetail) => {
    this.setState({ cardDetails: cardDetail, showModal: true });
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
          {this.state.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={this.handleDeleteCard}
              OnClickModal={this.handleModalClick}
            />
          ))}
        </div>
        <div className="list-bottom">
          {this.state.visibleTextArea === true ? (
            <Textarea
              value={this.state.inputCardTitle}
              onCancelBtn={this.handleCancelBtn}
              onAddBtn={this.handleAddToCard}
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
            cardDetail={this.state.cardDetails}
          />
        ) : null}
      </div>
    );
  }
}

export default List;
