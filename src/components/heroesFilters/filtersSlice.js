import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filters: [],   
}
const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersFetched: (state, action) => {
            state.filters = action.payload
        }
    }
})

export const {filtersFetched} = filtersSlice.actions;
export default filtersSlice.reducer