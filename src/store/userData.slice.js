import { createSlice } from '@reduxjs/toolkit';
import mwCreateNewUser from '../middlewares/mwCreateNewUser';
import mwLoginUser from '../middlewares/mwLoginUser';
import mwEditUserProfile from '../middlewares/mwEditUserProfile';

const initialState = {
  createStatus: null,
  loginStatus: null,
  editUserProfileStatus: null,
  lastCreatedUsername: null,
  currUserData: { username: null, image: null },
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,

  reducers: {
    confirmCreating: (state) => {
      state.createStatus = 'created';
    },
    confirmLoggedIn: (state) => {
      state.loginStatus = 'loggedIn';
    },
    confirmLoggedOut: (state) => {
      state.loginStatus = 'loggedOut';
    },
    confirmEditing: (state) => {
      state.editUserProfileStatus = 'edited';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mwCreateNewUser.pending, (state) => {
        state.createStatus = 'pending';
      })
      .addCase(mwCreateNewUser.fulfilled, (state, action) => {
        state.createStatus = 'resolved';
        state.lastCreatedUsername = action.payload;
      })
      .addCase(mwCreateNewUser.rejected, (state) => {
        state.createStatus = 'rejected';
      })

      .addCase(mwLoginUser.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(mwLoginUser.fulfilled, (state, action) => {
        state.loginStatus = 'resolved';
        state.currUserData = action.payload;
      })
      .addCase(mwLoginUser.rejected, (state) => {
        state.loginStatus = 'rejected';
      })

      .addCase(mwEditUserProfile.pending, (state) => {
        state.editUserProfileStatus = 'pending';
      })
      .addCase(mwEditUserProfile.fulfilled, (state, action) => {
        state.editUserProfileStatus = 'resolved';
        state.currUserData = action.payload;
      })
      .addCase(mwEditUserProfile.rejected, (state) => {
        state.editUserProfileStatus = 'rejected';
      });
  },
});

export const { confirmCreating, confirmLoggedIn, confirmLoggedOut, confirmEditing } =
  userDataSlice.actions;

export default userDataSlice.reducer;
