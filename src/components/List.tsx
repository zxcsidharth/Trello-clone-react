import React, { useState, useEffect, useRef } from "react";
import "../css/list.css";
import Card from "./card";
import Textarea from "./Textarea";
import Modal from "./Modal";
import { fetchCards, createCard, deleteCard, updateCard } from "../actions/actionOnList";
import { connect } from "react-redux";
import ModalV2 from "./ModalV2";

export interface CardObj {
  name: string,
  id: string,
  isDragging?: boolean,
  height?: number,
  pos?: number,
  idList?: string
}
interface Cards {
  [key: string]: CardObj[];
}
export interface UpdateCard {
  pos?: number | string,
  cardId: string,
  listId: string,
  name?: string,
  sourceListId?: string
}
interface ListProps {
  cards: Cards;
  fetchCards: (arg0: string) => Promise<void>;
  listId: string;
  listName: string;
  onDeleteList: (arg0: string) => void;
  deleteCard: (arg0: string, arg1: string) => Promise<void>;
  createCard: (arg0: string, arg1: string) => Promise<void>;
  updateCard: (arg0: UpdateCard) => Promise<CardObj>;
  setDragCardData: (arg0: CardObj | null) => void;
  getDragCardData: () => CardObj|null;
}
function List(props: ListProps) {
  const [textArea, showTextArea] = useState(false);
  const [displayModal, showModal] = useState(false);
  const [inputCardTitle, setInputCardTitle] = useState("");
  const [cardDetails, setCardDetail] = useState({ id: "", name: "" });
  const [cardList, setCardList] = useState<CardObj[]>([]);
  const lastIndexCount = useRef(-1);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    props.fetchCards(props.listId);
  }, []);
  const handleAddCards = () => {
    showTextArea(true); 
  };
  const handleCancelBtn = () => {
    showTextArea(false);
  };
  useEffect(() => {
    if(props.cards[props.listId] !== undefined && Array.isArray(props.cards[props.listId])) {
      setCardList([...props.cards[props.listId]]);
    }
  }, [props.cards, props.listId]);

  const handleInputValue = (e: { target: { value: string }; }) => {
    setInputCardTitle(e.target.value);
  };
  const handleModalClick = (cardDetail: { id: string; name: string; }) => {
    let cardDet = { ...cardDetails };
    cardDet.id = cardDetail.id;
    cardDet.name = cardDetail.name;
    setCardDetail(cardDet);
    showModal(true);
  };
  const closeModal = () => {
    showModal(false);
  };

  const handleDragStart = (e: any, data: { id: string; name: string}, startIndex: number) => {
    e.dataTransfer.clearData();
    const cardHeight = e.target.clientHeight;
    e.target.classList.add('dragging');
    props.setDragCardData(data);
    e.dataTransfer.setData('height', "" + cardHeight);
    e.dataTransfer.setData('cardId', data.id);
    e.dataTransfer.setData('listId', props.listId);
    e.dataTransfer.setData('startIndex', startIndex);
    lastIndexCount.current = startIndex;
  }
const handleOnDragOver =  (e: any, listId: string) => {
  e.preventDefault();
}
const updateListCard = async (cardData : UpdateCard) => {
  const res = await props.updateCard(cardData);
  if(res.id){
    props.fetchCards(cardData?.listId);
    if(cardData?.sourceListId) {
      props.fetchCards(cardData?.sourceListId);
    }
  }

}

const handleOnDrop = (e:any, listId: string) => {
  e.preventDefault();
  // DO the API call here and do the reordering.
  const dragEndListCards = props.cards[listId];
  if(Array.isArray(dragEndListCards) && dragEndListCards.length <= 0) return;

  let currCardPos = 0;
  if(lastIndexCount.current === 0 || lastIndexCount.current === -1) {
    // insert at first position
    currCardPos = dragEndListCards[1]?.pos ? dragEndListCards[1]?.pos / 2 : 0;
  } else if(lastIndexCount.current === dragEndListCards.length - 1) {
    // card to be inserted on last.
    const prevCard = dragEndListCards[dragEndListCards.length - 2];
    if(prevCard?.pos){
      currCardPos = 2 * prevCard.pos;
    }
  } else {
    // card to be insterted at any random position.
    let prevCard = dragEndListCards[lastIndexCount.current - 1];
    let nextCard = dragEndListCards[lastIndexCount.current + 1];
    if( prevCard?.pos && nextCard?.pos) {
      currCardPos = (prevCard.pos + nextCard.pos) / 2;
    }
  }

  const dragCard = props.getDragCardData();
  if(lastIndexCount.current >= 0 && dragCard){
    // Clear the object from the index, where it was set on last call.
    dragEndListCards.splice(lastIndexCount.current, 1, dragCard);
  }
  props.setDragCardData(null);
  updateListCard({pos: currCardPos, cardId: dragCard?.id || '', listId, sourceListId: dragCard?.idList || '',});
  setCardList([...dragEndListCards])
}

const handleOnDragEnter = (e:any, index: number) => {
  e.preventDefault();
  if(!e.target.className.includes('card draggable')) return;
  if(lastIndexCount.current === index) return; 

  const sourceCardListId = e.dataTransfer.getData('listId');
  const destnCardArr = props.cards[props.listId] !== undefined ? props.cards[props.listId] : [];
  const sourceCardArr = props.cards[props.listId] !== undefined ? props.cards[sourceCardListId] : [];
  
  const height = e.dataTransfer.getData('height');

  if(props.listId === sourceCardListId && lastIndexCount.current >= 0) {
    // It means dragging in the same list
    const dragCard = props.getDragCardData();
    sourceCardArr.splice(lastIndexCount.current, 1);
    if(dragCard){
      sourceCardArr.splice(index, 0, {
        ...dragCard, height,
        isDragging: true
      });
    }
    lastIndexCount.current = index;
    setCardList([...sourceCardArr]);

  } else {
    // dragging in different list
    if(destnCardArr.length > 0) {
      if(lastIndexCount.current >= 0){
        // Clear the object from the index, where it was set on last call.
        destnCardArr.splice(lastIndexCount.current, 1);
      }
      const dragObj = props.getDragCardData();
      if(dragObj){
        destnCardArr.splice(index, 0, {
          ...dragObj, height, 
          isDragging: true
        });
      }
      lastIndexCount.current = index;
      setCardList([...destnCardArr])
    }
  }
  
}
const handleOnDragLeave = (e: any, listId: string) => {
  e.preventDefault();
  e.stopPropagation();
  if(listRef.current) {
      const listBox = listRef.current.getBoundingClientRect();
      const xPos = e.clientX;
      const yPos = e.clientY;
      let isInsideBox = xPos > listBox.left && xPos < listBox.right && yPos > listBox.top && yPos < (listBox.top + listBox.height); // yaha pr bss box ko hi target karo abbhi k liye, instead of the entire list column.
      if(isInsideBox) return;

      // If not inside the box then clear the array and also clear the index count.
      if(props.cards[props.listId] !== undefined && props.cards[props.listId]) {
        const cardArr = props.cards[props.listId];
        if(lastIndexCount.current >= 0){
          cardArr.splice(lastIndexCount.current, 1);
            lastIndexCount.current = -1
        }
        setCardList([...cardArr])
      }
  }
}

// Isme ek aur bug hai ki agar list empty hai and then usme kuch v drag kar rhe hain to uss case me nai drag n drop nai ho raha hai. 
  return (
    <div ref={listRef} className="jumbotron list droppable" 
        onDragOver={(e) => handleOnDragOver(e, props.listId)} 
        onDrop={(e) => handleOnDrop(e, props.listId)}
        onDragLeave={(e) => handleOnDragLeave(e, props.listId)}>
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
        {cardList.map((card: { id: string; name: string }, index: number) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              onDelete={() => props.deleteCard(card.id, props.listId)}
              OnClickModal={handleModalClick}
              handleOnDragEnter={handleOnDragEnter}
              handleDragStart={handleDragStart}
              updateListCard={updateListCard}
            />
          ))}
      </div>
      <div className="list-bottom">
        {textArea === true ? (
          <Textarea
          // buttonTitle={inputCardTitle}
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
        <ModalV2
          onClickOutsideModal={closeModal}
          cardId={cardDetails.id}
          cardName={cardDetails.name}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state: { card: { cards: any; }; }) => {
  return {
    cards: state.card.cards,
  };
};

export default connect(mapStateToProps, { fetchCards, createCard, updateCard, deleteCard })(
  List
);