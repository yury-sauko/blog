import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk(
  'articleData/mwDeleteArticle',
  async (args, { rejectWithValue }) => {
    try {
      const baseUrl = 'https://blog.kata.academy/api';

      const response = await fetch(`${baseUrl}/articles/${args.slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${args.token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${baseUrl}/articles/${args.slug}, received status ${response.status}`,
        );
      }

      return args.slug;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
