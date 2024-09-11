import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import useLocalization from "../../hooks/useLocalization";
import CloseIcon from "@mui/icons-material/Close";
import { toPng } from "html-to-image";

const VerseCard = ({ verse = {}, language }) => {
  const { translate } = useLocalization();
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    if (contentRef.current) {
      const deviceWidth = window.innerWidth;
      const deviceHeight = window.innerHeight;

      toPng(contentRef.current, {
        quality: 1,
        backgroundColor: "#D1E9F6",
        width: deviceWidth, // Set width to device width
        height: deviceHeight, // Set height to device height
        quality: 1, // Set high quality
        pixelRatio: 2,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "verse-image.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };

  return (
    <>
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
      {/* Fullscreen Dialog */}
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent
          ref={contentRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            position: "relative",
            padding: "32px",
            boxSizing: "border-box",
            backgroundImage: `url(/images/hope.webp)`, // Background image
            backgroundSize: "cover", // Ensures the image covers the whole area
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", //
            border: "8px solid #FEFAE0",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              padding: "24px",
              color: "primary.main",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Noto Serif", "Roboto", serif', // Primary font for h3
                fontWeight: "bold", // Make the title bold
              }}
              variant="h5"
              gutterBottom
            >
              {verse[language]}
            </Typography>
            <Typography variant="body1">
              {`${translate(verse.book)} ${verse.chapter}:${verse.verse}`}
            </Typography>
          </Box>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            mb: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginTop: "16px" }}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            variant="contained"
            sx={{ marginTop: "16px" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default VerseCard;
