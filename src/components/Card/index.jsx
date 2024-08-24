import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import useLocalization from "../../hooks/useLocalization";

const VerseCard = ({ verse = {}, language }) => {
  const { translate } = useLocalization();

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <CardContent
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "#D1E9F6",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">{verse[language]}</Typography>
        </CardContent>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 1.5,
            textAlign: "right",
          }}
        >
          <Typography variant="body2">
            {`${translate(verse.book)} ${verse.chapter}:${verse.verse}`}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default VerseCard;
