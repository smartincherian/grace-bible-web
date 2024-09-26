import { Button, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerseCard from "../Card";

const ListItems = ({ items = [], isVerses, isSection }) => {
  const navigate = useNavigate();
  const { currentLanguage: LANGUAGE, translations } = useSelector(
    (state) => state.localizationData
  );

  const itemClickHandler = (id = "") => {
    if (isSection) navigate(`sections/${id}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {items?.length === 0 && isVerses ? (
        <>Please check later, currently no verses have been added</>
      ) : (
        items.map((item) => {
          if (isVerses) {
            return <VerseCard key={item.id} verse={item} language={LANGUAGE} />;
          }

          return (
            <Grid item xs={12} sm={4} key={item.id}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => itemClickHandler(item.id)}
                fullWidth
                sx={{
                  py: 2,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                {item[LANGUAGE]}
              </Button>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default ListItems;
