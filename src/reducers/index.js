import heroes from "../components/heroesList/heroesSlice";
import filtersSlice from '../components/heroesFilters/filtersSlice'
import activeBTN from "./activeBTN";

import { combineReducers } from 'redux'



export default combineReducers({
    heroes,
    activeBTN,
    filtersSlice
})