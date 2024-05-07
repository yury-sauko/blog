import { configureStore } from '@reduxjs/toolkit';
import startPageReducer from './startPage.slice';
import userDataReducer from './userData.slice';

export default configureStore({
  reducer: {
    startPage: startPageReducer,
    userData: userDataReducer,
  },
});
