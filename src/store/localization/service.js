import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchLocalization } from "../../firebase/localization";
import { setLocalization } from "./slice";

export const localizationApi = createApi({
  reducerPath: "localization",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["localization"],
  endpoints: (builder) => ({
    getLocalization: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const result = await fetchLocalization();
          dispatch(setLocalization(result));
          return {
            data: true,
          };
        } catch (e) {
          console.error(e);
          return { error: e?.message || "Some error occurred" };
        }
      },
    }),
  }),
});

export const { useGetSectionsMutation, useGetVersesMutation } = localizationApi;
