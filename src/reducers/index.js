import boardReducer from "./boardReducerContainer";
import listReducer from "./boardReducer";
import cardReducer from "./listReducer";
import checklistReducer from "./cardReducer";
import checkitemReducer from "./checklistReducer";
import { combineReducers } from "redux";

export default combineReducers({
  board: boardReducer,
  list: listReducer,
  card: cardReducer,
  checklist: checklistReducer,
  checkitem: checkitemReducer,
});
