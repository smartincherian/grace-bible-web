import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalization from "../../hooks/useLocalization";

const DailySection = ({ item }) => {
  const navigate = useNavigate();
  const { translate } = useLocalization();

  const { currentLanguage: LANGUAGE, translations } = useSelector(
    (state) => state.localizationData
  );
  const itemClickHandler = (id = "") => {
    navigate(`sections/${id}`);
  };
  return (
    <>
      <Typography variant="h6" align="center">
        {translate("todays-topic")}
      </Typography>
      <Grid item xs={12} sm={4} key={item?.id}>
        <Button
          variant="contained"
          color="violet"
          size="large"
          onClick={() => itemClickHandler(item?.id)}
          fullWidth
          sx={{
            py: 2,
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {item?.[LANGUAGE]}
        </Button>
      </Grid>
      <Typography variant="h6" align="center" mt={3}>
        {translate("choose-topic")}
      </Typography>
    </>
  );
};

export default DailySection;
