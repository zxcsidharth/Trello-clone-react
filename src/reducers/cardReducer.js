import { FETCH_CHECKLIST, ADD_CHECKLIST, DELETE_CHECKLIST } from "../constant";
const initialState = {
  checklists: [],
};

const checklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECKLIST:
      return {
        ...state,
        checklists: action.payload,
      };
    case ADD_CHECKLIST:
      return {
        ...state,
        checklists: [...state.checklists, action.payload],
      };
    case DELETE_CHECKLIST:
      return {
        ...state,
        checklists: state.checklists.filter((checklist) => {
          return checklist.id !== action.key;
        }),
      };
    default:
      return state;
  }
};
export default checklistReducer;
