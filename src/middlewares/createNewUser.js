import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('userData/createNewUser', async (userData, { rejectWithValue }) => {
  try {
    const baseUrl = 'https://blog.kata.academy/api';

    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${baseUrl}/users, received status ${response.status}`);
    }

    const data = await response.json();

    return data.user.username;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
