import React, { useRef, useState } from "react";
import "../css/list.css";
import { CardObj, UpdateCard } from "./List";
import CardEditModal from "./cards/cardEditModal";
import { BOTTOM_LEFT, BOTTOM_RIGHT, TOP_LEFT, TOP_RIGHT } from "../constant";

interface CardProps {
  card: CardObj; 
  index: number;
  OnClickModal: (arg0: {id: string; name: string}) => void; 
  onDelete: (arg0: string) => Promise<void>;
  handleOnDragEnter: (arg0: any, arg1: number) => void;
  handleDragStart: (arg0: any, arg1: CardObj, arg3: number) => void;
  updateListCard: (arg0: UpdateCard) => void;
}
function Card(props: CardProps) {
const [clickEdit, setEditBtnClicked] = useState(false);
const [cardPosition, setCardPosition] = useState({top: 0, left: 0, cardWidth: 0, menuBtnPos: BOTTOM_RIGHT});
const cardRef = useRef<HTMLDivElement | null>(null);

  const clickEditIcon = (e: any) => {
    if(cardRef.current) {
      const cardBox = cardRef.current.getBoundingClientRect();
      const topExcludingPopUp = window.innerHeight - 325; // 320 + 5 is the height of the edit box.
      const leftExcludingPopUp = window.innerWidth - 396; // 389 + 6 is width of the edit box.

      let top = cardBox.top - 2; // text area default top & left
      let left = cardBox.left - 2;
      let menuBtnPos = BOTTOM_RIGHT;
      if(cardBox.top > topExcludingPopUp && cardBox.left < leftExcludingPopUp){
        top = ((cardBox.top - 321) + cardBox.height);
        menuBtnPos = TOP_RIGHT;
      } else if(cardBox.top > topExcludingPopUp && cardBox.left >= leftExcludingPopUp){
        top = ((cardBox.top - 321) + cardBox.height);
        left = (cardBox.left - 187); // 175 width of the menu option and 12 px is for margin in right side
        menuBtnPos = TOP_LEFT;
      } else if(cardBox.top <= topExcludingPopUp && cardBox.left >= leftExcludingPopUp) {
        left = ((cardBox.left - 187)); // 175 width of the menu option and 12 px is for margin in right side
        menuBtnPos = BOTTOM_LEFT;
      } 
      setCardPosition(prev => ({
        ...prev,
        top: top,
        left: left,
        cardWidth: cardBox.width + 2,
        menuBtnPos
      }))
    }
    setEditBtnClicked(true);
  }

  const onCloseModal = () => {
    setEditBtnClicked(false);
  }
const onSaveEdit = (name: string) => {
  props.updateListCard({name, listId: props.card.idList || '', cardId: props.card.id});
  onCloseModal();
}
  return (
    <div ref={cardRef} className={props.card?.isDragging ? 'card dragging-card' : "card draggable"} draggable onDragStart={(e) => props.handleDragStart(e, props.card, props.index)} onDragEnter={(e) => props.handleOnDragEnter(e, props.index)}  >
      {props.card?.isDragging ? <div className='drag-shadow' style={{height: `${props.card?.height}px`}}></div> : <> <div
        className="card-body"
        data-cardid={props.card.id}
        onClick={() => props.OnClickModal(props.card)}
      >
        {props.card.name}
      </div>
      <button
        className="card-edit-icon"
        onClick={clickEditIcon}
      >
        <i className="fa fa-pencil"></i>
      </button> </>}
      {clickEdit && <CardEditModal boxPosition={cardPosition.menuBtnPos} onSaveEdit={onSaveEdit} topVal={cardPosition.top} leftVal={cardPosition.left} cardWidth={cardPosition.cardWidth} onClose={onCloseModal} defaultText={props.card.name}/>}
    </div>
  );
}
export default Card;