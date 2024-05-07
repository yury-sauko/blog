import { createSlice } from '@reduxjs/toolkit';
import createNewUser from '../middlewares/createNewUser';
import loginUser from '../middlewares/loginUser';

const initialState = {
  createStatus: null,
  loginStatus: null,
  lastCreatedUsername: null,
  currUserData: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,

  reducers: {
    updateCreateStatus: (state) => {
      state.createStatus = 'created';
    },
    confirmLoginStatus: (state) => {
      state.loginStatus = 'loggedIn';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.pending, (state) => {
        state.createStatus = 'pending';
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.createStatus = 'resolved';
        state.lastCreatedUsername = action.payload;
      })
      .addCase(createNewUser.rejected, (state) => {
        state.createStatus = 'rejected';
      })

      .addCase(loginUser.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = 'resolved';
        state.currUserData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = 'rejected';
      });
  },
});

export const { updateCreateStatus, confirmLoginStatus } = userDataSlice.actions;

export default userDataSlice.reducer;
