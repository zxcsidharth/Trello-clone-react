import {
  APIkey,
  token,
  base_url,
  FETCH_CHECKITEMS,
  ADD_CHECKITEM,
  GETS_ERROR,
  DELETE_CHECKITEM,
  UPDATE_CHECKITEM,
} from "../constant";

export const addCheckitemsSuccess = (checkitem, checklistId) => ({
  type: ADD_CHECKITEM,
  key: checklistId,
  payload: checkitem,
});
export const getCheckItems = (checkitems, checklistId) => ({
  type: FETCH_CHECKITEMS,
  key: checklistId,
  payload: checkitems,
});
export const deleteCheckitemSuccess = (checklistId, itemId) => ({
  type: DELETE_CHECKITEM,
  key: checklistId,
  itemId: itemId,
});

export const updateItemSuccess = (checkitem, itemId) => ({
  type: UPDATE_CHECKITEM,
  key: checkitem.idChecklist,
  itemId: itemId,
  payload: checkitem,
});

export const getCardFailure = () => ({
  type: GETS_ERROR,
});

export const addCheckItem = (checklistId, checkItemName) => {
  let url = `${base_url}checklists/${checklistId}/checkItems?name=${checkItemName}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(addCheckitemsSuccess(data, checklistId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};

export const deleteCheckitem = (itemId, checkListid) => {
  let url = `${base_url}checklists/${checkListid}/checkItems/${itemId}?key=${APIkey}&token=${token}`;
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
      dispatch(deleteCheckitemSuccess(checkListid, itemId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};

export const updateCheckItem = (cardId, itemId, itemName) => {
  let url = `${base_url}cards/${cardId}/checkItem/${itemId}?name=${itemName}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(updateItemSuccess(data, itemId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};

export const markCheckUncheck = (cardId, itemId, itemState) => {
  let url = `${base_url}cards/${cardId}/checkItem/${itemId}?state=${itemState}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch(updateItemSuccess(data, itemId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};
