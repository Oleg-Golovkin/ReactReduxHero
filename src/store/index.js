import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

const enhancer = (configureStore) => (...args) => {
    const store = configureStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === "string") {
            return oldDispatch({type: action})
        }
        return oldDispatch(action )
    }

    return store
}

const store = configureStore({reducer});

export default store;