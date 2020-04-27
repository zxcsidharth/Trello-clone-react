import {
  FETCH_CHECKITEMS,
  ADD_CHECKITEM,
  DELETE_CHECKITEM,
  UPDATE_CHECKITEM,
} from "../constant";
const initialState = {
  checkitems: {},
};

const checkitemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECKITEMS:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.key]: action.payload,
        },
      };
    case ADD_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.key]: [...state.checkitems[action.key], action.payload],
        },
      };
    case DELETE_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.key]: state.checkitems[action.key].filter((checkitem) => {
            return checkitem.id !== action.itemId;
          }),
        },
      };
    case UPDATE_CHECKITEM:
      return {
        ...state,
        checkitems: {
          ...state.checkitems,
          [action.key]: state.checkitems[action.key].map((checklist) => {
            return checklist.id === action.itemId ? action.payload : checklist;
          }),
        },
      };
    default:
      return state;
  }
};
export default checkitemReducer;
