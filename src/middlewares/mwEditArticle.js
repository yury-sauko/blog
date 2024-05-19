import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('articleData/mwEditArticle', async (args, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api';

    const response = await fetch(`${baseUrl}/articles/${args.slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${args.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(args.articleData),
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${baseUrl}/articles/${args.slug}, received status ${response.status}`,
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
