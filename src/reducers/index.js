import heroes from "./heroes";
import activeBTN from "./activeBTNSlice";

import { combineReducers } from 'redux'



export default combineReducers({
    heroes,
    activeBTN
})