import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalization from "../../hooks/useLocalization";
import VerseCard from "../Card";

const ListItems = ({ items = [], isVerses, isSection }) => {
  const navigate = useNavigate();

  const LANGUAGE = "malayalam";

  const itemClickHandler = (id = "") => {
    if (isSection) navigate(`sections/${id}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {items.map((item) => {
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
      })}
    </Grid>
  );
};

export default ListItems;
