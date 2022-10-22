import heroesSlice from "./heroesSlice";
import activeBTNSlice from "./activeBTNSlice";
import filtersSlice from "./filtersSlice";
import { combineReducers } from 'redux'



export default combineReducers({
    heroesSlice,
    activeBTNSlice,
    filtersSlice
})