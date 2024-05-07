import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('userData/mwEditUserProfile', async (args, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api';

    const response = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${args.token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(args.userInfo),
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${baseUrl}/user, received status ${response.status}`);
    }

    const data = await response.json();

    return data.user;
  } catch (error) {
    return rejectWithValue(error);
  }
});
