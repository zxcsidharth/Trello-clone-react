import { FETCH_LISTS, CREATE_LISTS, ARCHIVE_LIST } from "../constant";

const initialState = {
  lists: [],
  hasError: false,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case CREATE_LISTS:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case ARCHIVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => {
          return list.id !== action.payload.id;
        }),
      };
    default:
      return state;
  }
};

export default listReducer;
