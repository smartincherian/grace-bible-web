import { createSlice } from "@reduxjs/toolkit";

const versesSlice = createSlice({
  name: "versesData",
  initialState: {
    sections: [],
    verses: [],
  },
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setVerses: (state, action) => {
      state.verses = action.payload;
    },
  },
});

export const { setSections, setVerses } = versesSlice.actions;

export default versesSlice.reducer;
