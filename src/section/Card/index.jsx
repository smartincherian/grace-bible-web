import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useLocalization from "../../hooks/useLocalization";
import VerseDialog from "./VerseDialog";

const VerseCard = ({ verse = {}, language = "malayalam" }) => {
  const { translate } = useLocalization();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const contentRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {verse[language] ? (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            onClick={handleClickOpen}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 4,
              transition: "transform 0.3s ease",
              cursor: "pointer",
              maxWidth: "100%",
              wordBreak: "break-word",
              overflowWrap: "break-word",
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
      ) : (
        <></>
      )}

      {/* Fullscreen Dialog */}
      <VerseDialog
        verse={verse}
        language={language}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default VerseCard;
