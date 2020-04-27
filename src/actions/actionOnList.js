import {
  APIkey,
  token,
  base_url,
  FETCH_CARDS,
  CREATE_CARDS,
  GETS_ERROR,
  DELETE_CARDS,
} from "../constant";

export const addCardSuccess = (card) => ({
  type: CREATE_CARDS,
  key: card.idList,
  payload: card,
});
export const getCardSuccess = (cards, listId) => ({
  type: FETCH_CARDS,
  key: listId,
  payload: cards,
});
export const deleteCardSuccess = (cardId, listId) => ({
  type: DELETE_CARDS,
  key: listId,
  payload: cardId,
});

export const getCardFailure = () => ({
  type: GETS_ERROR,
});

export const fetchCards = (listId) => {
  let url = `${base_url}lists/${listId}/cards?key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getCardSuccess(data, listId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};
export const createCard = (cardName, listId) => {
  let url = `${base_url}cards?name=${cardName}&idList=${listId}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addCardSuccess(data));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};

export const deleteCard = (cardId, listId) => {
  let url = `${base_url}cards/${cardId}?key=${APIkey}&token=${token}`;

  console.log(url);
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(deleteCardSuccess(cardId, listId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};
