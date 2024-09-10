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
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "#D1E9F6",
            padding: "16px", // Padding around the content
          },
        }}
      >
        <DialogContent
          ref={contentRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: "relative",
            padding: "32px",
            boxSizing: "border-box",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 8, color: "lightgrey" }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              textAlign: "center",
              padding: "24px",
              border: "2px solid #4A90E2", // Inner border for the content box
              borderRadius: "12px",
              backgroundColor: "primary.main",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              color: "whitesmoke",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {verse[language]}
            </Typography>
            <Typography variant="body1">
              {`${translate(verse.book)} ${verse.chapter}:${verse.verse}`}
            </Typography>
          </Box>
        </DialogContent>
        <Button
          variant="contained"
          sx={{ marginTop: "16px" }}
          onClick={handleDownload}
        >
          Download Image
        </Button>
      </Dialog>
    </>
  );
};

export default VerseCard;
