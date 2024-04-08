import React, { useEffect, useRef, useState } from 'react';
import BaseModal from '../Atom/BaseModal';
import './card.css';
import Button from '../Atom/Button';
import { Popover } from '../Atom/Popover';

export default function CardEditModal({topVal, boxPosition, onSaveEdit, leftVal, cardWidth, onClose, defaultText }){
    const [editedCardName, setEditedCardName] = useState(defaultText);
    const textAreaRef = useRef(null);
    const handleOnChangeText = (e) => {
        setEditedCardName(e.target.value);
    }
    useEffect(() => {
        if(textAreaRef.current){
            textAreaRef.current.focus();
            textAreaRef.current.select();
        }
    }, [])

    return <BaseModal onClose={onClose}>
        <div className='card-edit-modal' style={{transform: `translate(${leftVal}px, ${topVal}px)`}} onClick={(e) => e.stopPropagation()}>
            <div className={`card-edit-field box-pos-${boxPosition}`} style={{width: `${cardWidth}px`, display: 'flex', flexDirection: 'column'}}>
                <form>
                    <div className='textarea-wrapper'>
                        <textarea ref={textAreaRef} className='card-edit-textarea form-control' onChange={handleOnChangeText}>{defaultText}</textarea>
                    </div>
                    <Button variant='primary' btnStyle={{marginTop: '10px'}} onClick={(e) => {e.preventDefault(); onSaveEdit(editedCardName)}}>Save</Button>
                </form>
            </div>
            <div className={`edit-menu-options edit-menu-${boxPosition}`} style={{transform: `translate(${cardWidth + 8}, ${topVal})`}}>
                <Button variant='trello-primary' icon='fa fa-credit-card'>Open card</Button>
                <Button variant='trello-primary' icon='fa fa-tag'>Edit labels</Button>
                <Button variant='trello-primary' icon='fa fa-user-o'>Change members</Button>
                <Button variant='trello-primary' icon='fa fa-credit-card-alt'>Change cover</Button>
                <Button variant='trello-primary' icon='fa fa-clock-o'>Edit dates</Button>
                <Button variant='trello-primary' icon='fa fa-arrow-right'>Move</Button>
                <Button variant='trello-primary' icon='fa fa-clone'>Copy</Button>
                <Popover
                content={<div style={{zIndex: 999}}>Hi! I'm popover content.</div>}
                >
                <Button variant='trello-primary' icon='fa fa-archive'>Archive</Button>

                </Popover>
            </div>
        </div>
    </BaseModal>
}