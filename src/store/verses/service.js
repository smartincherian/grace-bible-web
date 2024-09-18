import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { setSections, setTags, setVerses } from "./slice";
import { fetchVerses, verseAdd } from "../../firebase/verses/verses";
import {
  fetchSections,
  fetchSectionsTags,
  sectionAdd,
  sectionsSearch,
  sectionUpdate,
} from "../../firebase/verses/sections";

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
    addVerse: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const response = await verseAdd(data);
          return {
            data: response,
          };
        } catch (e) {
          console.error(e);
          return { error: e?.message || "Some error occurred" };
        }
      },
    }),
    addSection: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const newSection = await sectionAdd(data);
          const currentSections = getState().versesData.sections;
          const updatedSections = [...currentSections, newSection];
          dispatch(setSections(updatedSections));
          return {
            data: true,
          };
        } catch (e) {
          console.error(e);
          return { error: e?.message || "Some error occurred" };
        }
      },
    }),
    updateSection: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const { id, tags } = data || {};
          await sectionUpdate({ id, tags });
          return {
            data: true,
          };
        } catch (e) {
          console.error(e);
          return { error: e?.message || "Some error occurred" };
        }
      },
    }),
    searchSections: builder.mutation({
      async queryFn(search, { dispatch, getState }) {
        try {
          let result = [];
          if (search) {
            result = await sectionsSearch(search);
          } else {
            result = await fetchSections();
          }
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
    getTags: builder.mutation({
      async queryFn(data, { dispatch, getState }) {
        try {
          const result = await fetchSectionsTags();
          dispatch(setTags(result));
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

export const {
  useGetSectionsMutation,
  useGetVersesMutation,
  useAddVerseMutation,
  useAddSectionMutation,
  useUpdateSectionMutation,
  useSearchSectionsMutation,
  useGetTagsMutation,
} = versesApi;
