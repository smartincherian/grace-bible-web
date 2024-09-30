import {
  Box,
  Card,
  CardContent,
  Container,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import ListItems from "../ListItems";
import DailySection from "./DailySection";
import { getTodaysSection, setTodaysSection } from "./utils";
import SearchComponent from "./SearchComponent";
import { useSelector } from "react-redux";

const ListItemsWrapper = ({ heading, image, isSection, isVerses, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { verses = [] } = RootState()?.versesData;

  const sections = useSelector((state) => state.versesData.sections);

  const [todaysSection, setTodaysSectionState] = useState(null);

  useEffect(() => {
    let storedSection = getTodaysSection();
    if (!storedSection && sections.length > 0) {
      const randomSection =
        sections[Math.floor(Math.random() * sections.length)];
      setTodaysSection(randomSection);
      storedSection = randomSection;
    }
    setTodaysSectionState(storedSection);
  }, [sections]);

  const remainingSections = sections.filter(
    (section) => section.id !== todaysSection?.id
  );

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          {image ? (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <img
                src={image}
                alt="My Beautiful App Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: "150px",
                }}
              />
            </Box>
          ) : null}

          {isSection && <DailySection item={todaysSection} />}
          {isSection && <SearchComponent />}

          {loading || (!todaysSection && isSection) ? (
            <Skeleton
              variant="text"
              width="30%"
              height={70}
              sx={{ mb: 2, mx: "auto" }}
            />
          ) : (
            <ListItems
              items={isSection ? remainingSections : verses}
              isVerses={isVerses}
              isSection={isSection}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ListItemsWrapper;
