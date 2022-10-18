import {heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice"
import {filtersFetched} from '../components/heroesFilters/filtersSlice'

export const heroesReduxThunk = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const filterReduxThunk = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
            .then(data=> dispatch(filtersFetched(data)))
}

// export const filterFetched = (filter) => {
//     return {
//         type: 'FILTER_FETCHED',
//         payload: filter
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }
export const onActiveBTN = (name) => {
    return {
        type: 'ONACTIVE_BTN',
        payload: name
    }
}

