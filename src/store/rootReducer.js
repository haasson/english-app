import { combineReducers } from "redux";
import appReducer from "./app/reducer";
import glossaryReducer from "./glossary/reducer";

export default combineReducers({
  app: appReducer,
  glossary: glossaryReducer
});