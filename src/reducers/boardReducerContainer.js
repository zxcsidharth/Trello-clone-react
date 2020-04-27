// import * as actions from "../actions/fetchAllBoards";
import { FETCH_ALL_BOARDS, CREATE_BOARDS } from "../constant";

const initialState = {
  boards: [],
  hasError: false,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BOARDS:
      console.log(action.payload);
      return {
        ...state,
        boards: action.payload,
      };
    case CREATE_BOARDS:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };

    default:
      return state;
  }
};

export default boardReducer;
