import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
let initialObject = {};
const store = createStore(
  rootReducer,
  initialObject,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
