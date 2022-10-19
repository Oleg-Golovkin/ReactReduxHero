import { createSlice } from '@reduxjs/toolkit'

const initialState = {    
    activeBTN: ""
}

const activeBTNSlice = createSlice({
    name: "on",
    initialState,
    reducers: {
        onActiveBTN: (state, action)=>  {
            state.activeBTN = action.payload
        },
    }
})

const {actions, reducer} = activeBTNSlice;

export const {onActiveBTN} = actions;
export default reducer





// const initialState = {    
//     activeBTN: ""
// }

// const activeBTN = (state = initialState, action) => {
//     switch (action.type) {        
//         case "ONACTIVE_BTN": 
//         return {
//             ...state,
//             activeBTN: action.payload,
//         }
//         default: return state
//     }
// }

// export default activeBTN;