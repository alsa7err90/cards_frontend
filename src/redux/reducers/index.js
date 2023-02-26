import { combineReducers } from "redux";
import { getewaysReducer } from "./getewaysReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({ 
    userReducer : userReducer,
    getewaysReducer : getewaysReducer,
});

export default reducers;