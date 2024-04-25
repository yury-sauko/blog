import { configureStore } from '@reduxjs/toolkit';
import startPageReducer from './startPage.slice';

export default configureStore({
  reducer: {
    startPage: startPageReducer,
  },
});
