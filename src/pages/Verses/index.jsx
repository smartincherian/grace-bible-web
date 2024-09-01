// src/Counter.js

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListItemsWrapper from "../../section/ListItemsWrapper";
import { useGetVersesMutation } from "../../store/verses/service";

const Verses = () => {
  const { id } = useParams();
  const [getVerses, { isLoading }] = useGetVersesMutation();

  useEffect(() => {
    getVersesHandler();
  }, []);

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
