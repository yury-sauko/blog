import { createSlice } from '@reduxjs/toolkit';
import mwCreateNewUser from '../middlewares/mwCreateNewUser';
import mwLoginUser from '../middlewares/mwLoginUser';
import mwEditUserProfile from '../middlewares/mwEditUserProfile';

const initialState = {
  createUserStatus: null,
  loginStatus: null,
  isLoginError: false,
  isCreateUserError: false,
  editUserProfileStatus: null,
  lastCreatedUsername: null,
  currUserData: { username: '', image: '', token: '' },
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,

  reducers: {
    confirmCreating: (state) => {
      state.createUserStatus = 'created';
    },
    confirmLoggedIn: (state) => {
      state.loginStatus = 'loggedIn';
    },
    confirmLoggedOut: (state) => {
      state.loginStatus = 'loggedOut';
      state.currUserData = { username: '', image: '', token: '' };
    },
    confirmEditing: (state) => {
      state.editUserProfileStatus = 'edited';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mwCreateNewUser.pending, (state) => {
        state.createUserStatus = 'pending';
      })
      .addCase(mwCreateNewUser.fulfilled, (state, action) => {
        state.createUserStatus = 'resolved';
        state.lastCreatedUsername = action.payload;
      })
      .addCase(mwCreateNewUser.rejected, (state, action) => {
        state.createUserStatus = 'rejected';

        if (action.payload === '422') {
          state.isCreateUserError = true;
        }
      })

      .addCase(mwLoginUser.pending, (state) => {
        state.loginStatus = 'pending';
        state.isLoginError = false;
      })
      .addCase(mwLoginUser.fulfilled, (state, action) => {
        state.loginStatus = 'resolved';
        state.currUserData = action.payload;
      })
      .addCase(mwLoginUser.rejected, (state, action) => {
        state.loginStatus = 'rejected';

        if (action.payload === '422') {
          state.isLoginError = true;
        }
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
