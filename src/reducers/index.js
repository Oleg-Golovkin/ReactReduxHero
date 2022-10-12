import heroes from "./heroes";
import activeBTN from "./activeBTN";

import { combineReducers } from 'redux'


export default combineReducers({
    heroes,
    activeBTN
})