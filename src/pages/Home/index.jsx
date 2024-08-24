import { useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import ListItemsWrapper from "../../components/ListItemsWrapper";
import { useGetSectionsMutation } from "../../store/verses/service";

const Home = ({ onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [getSections, { isLoading }] = useGetSectionsMutation();

  useEffect(() => {
    getSectionsHandler();
  }, []);

  const getSectionsHandler = async () => {
    try {
      await getSections();
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  return (
    <ListItemsWrapper
      heading={"choose-topic"}
      image={"/images/logo.webp"}
      isSection={true}
      loading={isLoading}
    />
  );
};

export default Home;
