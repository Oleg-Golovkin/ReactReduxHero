import {heroesFetching, heroesFetchingError, heroesFetched} from "../reducers/heroesSlice"

export const heroesReduxThunk = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
} 