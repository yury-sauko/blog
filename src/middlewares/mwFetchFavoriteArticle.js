import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk(
  'articleData/mwFetchFavoriteArticle',
  async (args, { rejectWithValue }) => {
    try {
      const baseUrl = 'https://blog.kata.academy/api';

      const response = await fetch(`${baseUrl}/articles/${args.slug}/favorite`, {
        method: args.method,
        headers: {
          Authorization: `Token ${args.token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${baseUrl}/articles/${args.slug}/favorite, received status ${response.status}`,
        );
      }

      return { slug: args.slug, method: args.method };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
