import { createSlice } from '@reduxjs/toolkit';
import mwCreateNewArticle from '../middlewares/mwCreateNewArticle';
import mwEditArticle from '../middlewares/mwEditArticle';
import mwDeleteArticle from '../middlewares/mwDeleteArticle';

const initialState = {
  createArticleStatus: null,
  editArticleStatus: null,
  deleteArticleStatus: null,
  lastArticleActionType: null,
  lastCreatedArticleData: {},
  lastEditedArticleData: {},
  lastDeletedArticleSlug: null,
  createdTagsArr: [''],
  editedTagsArr: [],
};

const articleDataSlice = createSlice({
  name: 'articleData',
  initialState,

  reducers: {
    pushToCreatedTagsArr: (state) => {
      state.createdTagsArr.push(Math.random().toFixed(3) * 1000);
    },
    delFromCreatedTagsArr: (state, action) => {
      const idx = state.createdTagsArr.findIndex((el) => el === action.payload);
      state.createdTagsArr.splice(idx, 1);
    },
    initializeEditedTagsArr: (state, action) => {
      state.editedTagsArr = [...action.payload];
    },
    pushToEditedTagsArr: (state) => {
      state.editedTagsArr.push('');
    },
    delFromEditedTagsArr: (state, action) => {
      const idx = state.editedTagsArr.findIndex((el) => el === action.payload);
      state.editedTagsArr.splice(idx, 1);
    },
    confirmCreating: (state) => {
      state.createArticleStatus = 'created';
    },
    confirmEditing: (state) => {
      state.editArticleStatus = 'edited';
    },
    confirmDeleting: (state) => {
      state.deleteArticleStatus = 'deleted';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mwCreateNewArticle.pending, (state) => {
        state.createArticleStatus = 'pending';
      })
      .addCase(mwCreateNewArticle.fulfilled, (state, action) => {
        state.createArticleStatus = 'resolved';
        state.lastArticleActionType = 'create';
        state.lastCreatedArticleData = action.payload;
      })
      .addCase(mwCreateNewArticle.rejected, (state) => {
        state.createArticleStatus = 'rejected';
      })

      .addCase(mwEditArticle.pending, (state) => {
        state.editArticleStatus = 'pending';
      })
      .addCase(mwEditArticle.fulfilled, (state, action) => {
        state.editArticleStatus = 'resolved';
        state.lastArticleActionType = 'edit';
        state.lastEditedArticleData = action.payload;
      })
      .addCase(mwEditArticle.rejected, (state) => {
        state.editArticleStatus = 'rejected';
      })

      .addCase(mwDeleteArticle.pending, (state) => {
        state.deleteArticleStatus = 'pending';
      })
      .addCase(mwDeleteArticle.fulfilled, (state, action) => {
        state.deleteArticleStatus = 'resolved';
        state.lastArticleActionType = 'delete';
        state.lastDeletedArticleSlug = action.payload;
      })
      .addCase(mwDeleteArticle.rejected, (state) => {
        state.deleteArticleStatus = 'rejected';
      });
  },
});

export const {
  pushToCreatedTagsArr,
  delFromCreatedTagsArr,
  initializeEditedTagsArr,
  pushToEditedTagsArr,
  delFromEditedTagsArr,
  confirmCreating,
  confirmEditing,
  confirmDeleting,
} = articleDataSlice.actions;

export default articleDataSlice.reducer;
