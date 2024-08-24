import {createSlice} from '@reduxjs/toolkit';

const versesSlice = createSlice({
  name: 'versesData',
  initialState: {
    verses: [],
  },
  reducers: {
    setVerses: (state, action) => {
      state.verses = action.payload;
    },
  },
});

export const {setVerses} = versesSlice.actions;

export default versesSlice.reducer;
