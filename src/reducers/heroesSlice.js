import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttp} from "../hooks/http.hook" 

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// export const heroesReduxThunk = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//         request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))
// } 

export const reduxThunkHeroes = createAsyncThunk(
    "heroes/reduxThunkHeroes",
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        // heroesFetching: state => {
        //     state.heroesLoadingStatus = 'HEROES_FETCHING'
        // },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'HEROES_FETCHED';
            state.heroes = action.payload
        },
        // heroesFetchingError: state=> {
        //     state.heroesLoadingStatus = 'HEROES_FETCHING_ERROR'
        // },
        extraReducers: (builder) => {
            builder
                .addCase(reduxThunkHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
                .addCase(reduxThunkHeroes.fulfilled, (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    state.heroes = action.payload;
                })
                .addCase(reduxThunkHeroes.rejected, state => {
                    state.heroesLoadingStatus = 'error';
                })
                .addDefaultCase(() => {})
        }
    }
})

const {reducer, actions} = heroesSlice;

export const {heroesFetched} = actions;
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