import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'HEROES_FETCHING'
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'HEROES_FETCHED';
            state.heroes = action.payload
        },
        heroesFetchingError: state=> {
            state.heroesLoadingStatus = 'HEROES_FETCHING_ERROR'
        },
    }
})

const {reducer, actions} = heroesSlice;

export const {heroesFetching, heroesFetched, heroesFetchingError} = actions;
export default reducer;



// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }       
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

// export default heroes;