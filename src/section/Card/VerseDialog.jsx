import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import useLocalization from "../../hooks/useLocalization";
import { COUNT_OF_IMAGES } from "../../utils/constants";

const VerseDialog = ({
  verse = {},
  language = "malayalam",
  open,
  onClose,
  isWallpaper = false,
}) => {
  const { translate } = useLocalization();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const getRandomImage = () => {
    const imageNumber = Math.floor(Math.random() * COUNT_OF_IMAGES) + 1;
    return `/images/${imageNumber}.webp`;
  };

  const handleChangeImage = () => {
    const image = new Image();
    image.onload = () => {
      setBackgroundImage(`url(${image.src})`);
    };
    image.src = getRandomImage();
  };

  return (
    <>
      {/* Fullscreen Dialog */}
      <Dialog open={open} onClose={onClose} fullScreen>
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
          {isWallpaper && (
            <Button
              variant="contained"
              sx={{ marginTop: "16px" }}
              onClick={handleChangeImage}
            >
              Change image
            </Button>
          )}

          <Button
            variant="contained"
            sx={{ marginTop: "16px" }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default VerseDialog;
