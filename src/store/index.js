import { configureStore } from "@reduxjs/toolkit";
import { versesApi } from "./verses/service";
import versesSlice from "./verses/slice";
import localizationSlice from "./localization/slice";
import { localizationApi } from "./localization/service";

export const store = configureStore({
  reducer: {
    [versesApi.reducerPath]: versesApi.reducer,
    [localizationApi.reducerPath]: localizationApi.reducer,
    localizationData: localizationSlice,
    versesData: versesSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      versesApi.middleware,
      localizationApi.middleware,
    ]),
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
