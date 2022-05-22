import {
  APIkey,
  token,
  base_url,
  GET_BOARDS_ERROR,
  FETCH_ALL_BOARDS,
  CREATE_BOARDS,
} from "../constant";

export const addBoardSuccess = (board) => ({
  type: CREATE_BOARDS,
  payload: board,
});
export const getBoardSuccess = (boards) => ({
  type: FETCH_ALL_BOARDS,
  payload: boards,
});

export const getBoardsFailure = () => ({
  type: GET_BOARDS_ERROR,
});

export function fetchBoards() {
  let url = `${base_url}members/me/boards?key=${APIkey}&token=${token}`;
  console.log(url);
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getBoardSuccess(data));
    } catch (error) {
      dispatch(getBoardsFailure());
    }
  };
}
export const createBoard = (inputName) => {
  let url = `${base_url}/boards?name=${inputName}&key=${APIkey}&token=${token}`;
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(addBoardSuccess(data));
    } catch (error) {
      dispatch(getBoardsFailure());
    }
  };
};
