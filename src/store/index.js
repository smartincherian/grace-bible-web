import { configureStore } from "@reduxjs/toolkit";
import { versesApi } from "./verses/service";
import versesSlice from "./verses/slice";
import localizationSlice from "./localization/slice";

export const store = configureStore({
  reducer: {
    [versesApi.reducerPath]: versesApi.reducer,
    localizationData: localizationSlice,
    versesData: versesSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({}).concat([projectsApi.middleware]),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
