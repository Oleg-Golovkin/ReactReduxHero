import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filters: [],    
}


const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterFetched: (state, action) => {state.filters = action.payload}
    }
})

const {actions, reducer} = filterSlice;

export const {filterFetched} = actions;
export default reducer;



// const filtersSlice = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTER_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//             }
//         default: return state
//     }
// }

// export default filtersSlice;