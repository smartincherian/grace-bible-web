import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItems from "../ListItems";
import useLocalization from "../../hooks/useLocalization";
import { RootState } from "../../store";

const ListItemsWrapper = ({ heading, image, isSection, isVerses, loading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { translate } = useLocalization();

  const { sections = [], verses = [] } = RootState()?.versesData;

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

          <Typography variant="h6" align="center">
            {translate(heading)}
          </Typography>
          {loading ? (
            <Skeleton
              variant="text"
              width="30%"
              height={70}
              sx={{ mb: 2, mx: "auto" }}
            />
          ) : (
            <ListItems
              items={isSection ? sections : verses}
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
