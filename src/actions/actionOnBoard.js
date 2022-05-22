import {
  APIkey,
  token,
  base_url,
  FETCH_LISTS,
  CREATE_LISTS,
  GETS_ERROR,
  ARCHIVE_LIST,
} from "../constant";

export const addListSuccess = (list) => ({
  type: CREATE_LISTS,
  payload: list,
});
export const getListSuccess = (lists) => ({
  type: FETCH_LISTS,
  payload: lists,
});
export const deleteListSuccess = (list) => ({
  type: ARCHIVE_LIST,
  payload: list,
});

export const getBoardsFailure = () => ({
  type: GETS_ERROR,
});

export function fetchLists(boardId) {
  let url = `${base_url}/boards/${boardId}/lists?key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getListSuccess(data));
    } catch (error) {
      dispatch(getBoardsFailure());
    }
  };
}
export const createLists = (listName, boardId) => {
  let url = `${base_url}/boards/${boardId}/lists?name=${listName}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addListSuccess(data));
    } catch (error) {
      dispatch(getBoardsFailure());
    }
  };
};

export const deleteList = (listId) => {
  let url = `${base_url}lists/${listId}/closed?value=true&key=${APIkey}&token=${token}`;
  console.log(url);
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(deleteListSuccess(data));
    } catch (error) {
      dispatch(getBoardsFailure());
    }
  };
};
