// src/Counter.js

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ListItemsWrapper from "../../section/ListItemsWrapper";
import { useGetVersesMutation } from "../../store/verses/service";
import { setLocalStorage } from "../../utils/localStorage";
import { setCurrentLanguage } from "../../store/localization/slice";
import { useDispatch } from "react-redux";

const Verses = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const language = searchParams.get("lang");
  const dispatch = useDispatch();
  const [getVerses, { isLoading }] = useGetVersesMutation();

  useEffect(() => {
    getVersesHandler();
  }, []);

  useEffect(() => {
    if (language) {
      setLocalStorage("language", language);
      dispatch(setCurrentLanguage(language));
    }
  }, [language]);

  const getVersesHandler = async () => {
    try {
      await getVerses(id);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  return <ListItemsWrapper isVerses={true} loading={isLoading} />;
};

export default Verses;
