// src/Counter.js

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMMON_PRAYER_TYPES } from "../PrayerForm/constants";
import { useGetVersesMutation } from "../../store/verses/service";
import ListItemsWrapper from "../../components/ListItemsWrapper";

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
