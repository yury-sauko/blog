import { createSlice } from '@reduxjs/toolkit';
import mwFetchArticles from '../middlewares/mwFetchArticles';

const initialState = {
  statusArticlesReceipt: null,
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  offset: 0,
};

const startPageSlice = createSlice({
  name: 'startPage',
  initialState,

  reducers: {
    changePage: (state, action) => {
      state.statusArticlesReceipt = 'loading';
      state.currentPage = action.payload;
      state.offset = (action.payload - 1) * 5;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mwFetchArticles.pending, (state) => {
        state.statusArticlesReceipt = 'loading';
      })
      .addCase(mwFetchArticles.fulfilled, (state, action) => {
        state.statusArticlesReceipt = 'resolved';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(mwFetchArticles.rejected, (state) => {
        state.statusArticlesReceipt = 'rejected';
      });
  },
});

export const { changePage } = startPageSlice.actions;

export default startPageSlice.reducer;
