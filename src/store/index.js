import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

const newMiddleWare = () => (dispatch) => (action)=>{
        if (typeof action === "string") {
        return dispatch({type: action})
        }
        return dispatch(action)
}
// [thunk, newMiddleWare]
const store = configureStore({
        reducer, 
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(newMiddleWare)
});

export default store;