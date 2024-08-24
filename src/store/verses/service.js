import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import {fetchVerses} from '../../firebase/verses';
import { setVerses } from "./slice";

export const versesApi = createApi({
  reducerPath: "verses",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["verses"],
  endpoints: (builder) => ({
    getVerses: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          // const result = await fetchVerses();
          const result = {};
          dispatch(setVerses(result));
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

export const { useGetVersesMutation } = versesApi;
