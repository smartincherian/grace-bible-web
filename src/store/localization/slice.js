import { createSlice } from "@reduxjs/toolkit";
import english from "../../locales/english.json";

const localizationSlice = createSlice({
  name: "localization",
  initialState: {
    currentLanguage: "malayalam",
    translations: english,
  },
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setCurrentLanguage } = localizationSlice.actions;

export default localizationSlice.reducer;
