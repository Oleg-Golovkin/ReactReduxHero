import { configureStore } from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';

const store = configureStore({heroes});

export default store;