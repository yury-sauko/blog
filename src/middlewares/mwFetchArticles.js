import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('startPage/mwFetchArticles', async (args, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api';
    const resource = '/articles';
    const queryParamLimit = '?limit=5';
    const queryParamOffset = `&offset=${args.offset}`;
    const endPoint = baseUrl + resource + queryParamLimit + queryParamOffset;

    const response = await fetch(`${endPoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${args.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${endPoint}, received status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
