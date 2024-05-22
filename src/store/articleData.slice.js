import { createSlice } from '@reduxjs/toolkit';
import mwCreateNewArticle from '../middlewares/mwCreateNewArticle';
import mwEditArticle from '../middlewares/mwEditArticle';
import mwDeleteArticle from '../middlewares/mwDeleteArticle';
import mwFetchFavoriteArticle from '../middlewares/mwFetchFavoriteArticle';

const initialState = {
  createArticleStatus: null,
  editArticleStatus: null,
  deleteArticleStatus: null,
  lastArticleActionType: null,
  lastCreatedArticleData: null,
  lastEditedArticleData: null,
  lastDeletedArticleSlug: null,
  lastFavoriteArticleSlug: null,
  lastFavoriteArticleMethod: null,
};

const articleDataSlice = createSlice({
  name: 'articleData',
  initialState,

  reducers: {
    confirmCreating: (state) => {
      state.createArticleStatus = 'created';
    },
    confirmEditing: (state) => {
      state.editArticleStatus = 'edited';
    },
    confirmDeleting: (state) => {
      state.deleteArticleStatus = 'deleted';
    },
    changeFavoriteArticleMethod: (state) => {
      state.lastFavoriteArticleMethod = 'userIsLoggedOut';
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
      })

      .addCase(mwFetchFavoriteArticle.fulfilled, (state, action) => {
        state.lastFavoriteArticleSlug = action.payload.slug;
        state.lastFavoriteArticleMethod = action.payload.method;
      });
  },
});

export const { confirmCreating, confirmEditing, confirmDeleting, changeFavoriteArticleMethod } =
  articleDataSlice.actions;

export default articleDataSlice.reducer;
