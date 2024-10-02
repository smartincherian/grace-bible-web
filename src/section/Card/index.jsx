import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import useLocalization from "../../hooks/useLocalization";
import { toPng } from "html-to-image";
import { COUNT_OF_IMAGES } from "../../utils/constants";

const VerseCard = ({ verse = {}, language = "malayalam" }) => {
  const { translate } = useLocalization();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    if (open) {
      const image = new Image();
      image.onload = () => {
        setBackgroundImage(`url(${image.src})`);
        setImageLoaded(true);
      };
      image.src = getRandomImage();
    } else {
      setImageLoaded(false);
      setBackgroundImage("");
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateImage = () => {
    // adjustVerseSize();
    if (contentRef.current) {
      const imageWidth = isMobile
        ? window.screen.width
        : window.screen.width * window.devicePixelRatio;
      const imageHeight = isMobile
        ? window.screen.height
        : window.screen.height * window.devicePixelRatio;

      return toPng(contentRef.current, {
        quality: 1,
        backgroundColor: "#D1E9F6",
        width: imageWidth,
        height: imageHeight,
        pixelRatio: 2,
      });
    }
    return Promise.reject("No content to capture");
  };

  const handleDownload = () => {
    generateImage()
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
  };

  const handleShare = () => {
    generateImage()
      .then((dataUrl) => {
        if (navigator.share) {
          if (isMobile) {
            // For mobile devices, share the image
            fetch(dataUrl)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], "verse-image.png", {
                  type: blob.type,
                });
                if (
                  navigator.canShare &&
                  navigator.canShare({ files: [file] })
                ) {
                  navigator
                    .share({
                      files: [file],
                      title: "Bible Verse",
                      text: "Check out this Bible verse image!",
                    })
                    .catch((err) => console.error("Error sharing:", err));
                } else {
                  console.error("Sharing files is not supported.");
                }
              });
          } else {
            // For desktops, fallback to sharing a message or URL
            navigator
              .share({
                title: "Bible Verse",
                text: "Check out this Bible verse!",
                url: window.location.href, // Optional: share current page URL
              })
              .catch((err) => console.error("Error sharing:", err));
          }
        } else {
          console.warn("Web Share API not supported.");
        }
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  const adjustVerseSize = () => {
    if (contentRef.current) {
      contentRef.current.style.fontSize = isMobile ? "24px" : "52px"; // Adjust the size as needed
    }
  };

  const getRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * COUNT_OF_IMAGES) + 1;
    return `/images/${imageNumber}.webp`;
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
            boxSizing: "border-box",
            maxWidth: "100%",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            backgroundColor: "#FEFAE0",
            backgroundImage: backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "8px solid #FEFAE0",
            transition: "background-image 0.5s ease-in-out",
            opacity: imageLoaded ? 1 : 0.7,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "primary.main",
              backgroundColor: "rgba(254, 250, 224, 0.8)", // Semi-transparent background for text
              borderRadius: "8px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "32px",
              overflowY: "auto",
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
            onClick={handleShare}
          >
            Share
          </Button>
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
