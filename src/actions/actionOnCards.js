import {
  APIkey,
  token,
  base_url,
  FETCH_CHECKLIST,
  ADD_CHECKLIST,
  GETS_ERROR,
  DELETE_CHECKLIST,
} from "../constant";

export const addChecklistSuccess = (checklist) => ({
  type: ADD_CHECKLIST,
  payload: checklist,
});
export const getChecklistSuccess = (checklists) => ({
  type: FETCH_CHECKLIST,
  payload: checklists,
});
export const deleteChecklistSuccess = (checklistId) => ({
  type: DELETE_CHECKLIST,
  key: checklistId,
});

export const getCardFailure = () => ({
  type: GETS_ERROR,
});

export const fetchChecklist = (cardId) => {
  let url = `${base_url}cards/${cardId}/checklists?key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getChecklistSuccess(data));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};
export const addChecklist = (cardId, checklistName) => {
  let url = `${base_url}cards/${cardId}/checklists?name=${checklistName}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addChecklistSuccess(data));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};

export const deleteChecklist = (cardId, checkListId) => {
  let url = `${base_url}cards/${cardId}/checklists/${checkListId}?key=${APIkey}&token=${token}`;
  // pending

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
      dispatch(deleteChecklistSuccess(checkListId));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
};
