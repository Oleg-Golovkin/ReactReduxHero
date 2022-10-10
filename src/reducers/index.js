const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],    
    onActiveBTN: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }       
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'FILTER_FETCHED':
            return {
                ...state,
                filters: action.payload,
            }

        case "ONACTIVE_BTN": 
        return {
            ...state,
            onActiveBTN: action.payload,
        }
        default: return state
    }
}

export default reducer;