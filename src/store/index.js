import { configureStore } from '@reduxjs/toolkit';
import { compose } from 'redux';

import reducer from '../reducers';

const enhancers = (configureStore) => (...args) => {
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

const store = configureStore({reducer, enhancers});

export default store;