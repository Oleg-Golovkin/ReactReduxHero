import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/heroes';

const store = configureStore({reducer});

export default store;