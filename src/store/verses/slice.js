import { createSlice } from "@reduxjs/toolkit";

const versesSlice = createSlice({
  name: "versesData",
  initialState: {
    sections: [],
    verses: [],
    tags: [],
  },
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setVerses: (state, action) => {
      state.verses = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const { setSections, setVerses, setTags } = versesSlice.actions;

export default versesSlice.reducer;
