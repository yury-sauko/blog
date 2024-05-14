import { createSlice } from '@reduxjs/toolkit';
import mwCreateNewArticle from '../middlewares/mwCreateNewArticle';

const initialState = {
  createArticleStatus: null,
  lastCreatedArticleData: {},
  createdTagsArr: [1],
};

const articleDataSlice = createSlice({
  name: 'articleData',
  initialState,

  reducers: {
    pushToTagsArr: (state) => {
      state.createdTagsArr.push(Math.random().toFixed(3) * 1000);
    },
    delFromTagsArr: (state, action) => {
      const idx = state.createdTagsArr.findIndex((el) => el === action.payload);
      state.createdTagsArr.splice(idx, 1);
    },
    confirmCreating: (state) => {
      state.createArticleStatus = 'created';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mwCreateNewArticle.pending, (state) => {
        state.createArticleStatus = 'pending';
      })
      .addCase(mwCreateNewArticle.fulfilled, (state, action) => {
        state.createArticleStatus = 'resolved';
        state.lastCreatedArticleData = action.payload;
      })
      .addCase(mwCreateNewArticle.rejected, (state) => {
        state.createArticleStatus = 'rejected';
      });
  },
});

export const { pushToTagsArr, delFromTagsArr, confirmCreating } = articleDataSlice.actions;

export default articleDataSlice.reducer;
