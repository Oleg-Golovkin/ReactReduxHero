import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = "HEROES_FETCHING"
        },
        heroesFetched: (state, action)=>  {
            state.heroesLoadingStatus = 'HEROES_FETCHED';
            state.heroes = action.payload
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'HEROES_FETCHING_ERROR'
        }
    }
})

const {actions, reducer} = heroesSlice;

export const {heroesFetching, heroesFetched, heroesFetchingError} = actions;
export default reducer
