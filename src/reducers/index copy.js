const initialState = {    
    onActiveBTN: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {        
        case "ONACTIVE_BTN": 
        return {
            ...state,
            onActiveBTN: action.payload,
        }
        default: return state
    }
}

export default reducer;