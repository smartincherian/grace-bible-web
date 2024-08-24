import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { setSections, setVerses } from "./slice";
import { fetchVerses } from "../../firebase/verses/verses";
import { fetchSections } from "../../firebase/verses/sections";

export const versesApi = createApi({
  reducerPath: "verses",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["verses"],
  endpoints: (builder) => ({
    getSections: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const result = await fetchSections();
          dispatch(setSections(result));
          return {
            data: true,
          };
        } catch (e) {
          console.error(e);
          return { error: e?.message || "Some error occurred" };
        }
      },
    }),
    getVerses: builder.mutation({
      async queryFn(id, { dispatch, getState }) {
        try {
          const result = await fetchVerses(id);
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

export const { useGetSectionsMutation, useGetVersesMutation } = versesApi;
