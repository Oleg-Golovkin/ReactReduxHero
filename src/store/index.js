import { configureStore } from '@reduxjs/toolkit';
import { compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
        //   1.          1.1.          1.2.
// const enhancers = (createStore) => (...args) => {
//                     //  1.3
//     const store = createStore(...args);
//                     //  1.3.1
//     const oldDispatch = store.dispatch;
//                     //   1.3.2
//     store.dispatch = (action) => {
//                         //  1.3.3
//         if (typeof action === "string") {
//                     //    1.3.4    1.3.5
//             return oldDispatch({type: action})
//         }
//                 //  1.3.6     
//         return oldDispatch(action )
//     }
//     //   1.3.7.
//     return store 
// }

const newMiddleWare = () => (dispatch) => (action)=>{
    if (typeof action === "string") {
            return dispatch({type: action})
    }
    return dispatch(action)
}

const store = createStore(reducer, applyMiddleware(newMiddleWare));

export default store;