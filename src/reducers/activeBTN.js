const initialState = {    
    activeBTN: ""
}

const activeBTN = (state = initialState, action) => {
    switch (action.type) {        
        case "ONACTIVE_BTN": 
        return {
            ...state,
            activeBTN: action.payload,
        }
        default: return state
    }
}

export default activeBTN;