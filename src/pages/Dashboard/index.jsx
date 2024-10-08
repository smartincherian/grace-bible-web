import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetStatsMutation } from "../../store/verses/service";
import VersesTable from "../../section/AllVerses";
import { INITIAL_STATE, VERSES_SHOWING_TYPES } from "./constants";

const Dashboard = ({ type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [getStats, { isLoading, data }] = useGetStatsMutation();
  const [showVerses, setShowVerses] = useState(INITIAL_STATE);

  const now = new Date();

  useEffect(() => {
    getStatsHandler();
    return () => {
      setShowVerses(INITIAL_STATE);
    };
  }, []);

  const getStatsHandler = async () => {
    try {
      await getStats();
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const showAllVersesHandler = () => {
    setShowVerses({ show: true, type: VERSES_SHOWING_TYPES.ALL_VERSES });
  };
  const showConditionalVersesHandler = (lang) => {
    if (lang === "english") {
      setShowVerses({
        show: true,
        type: VERSES_SHOWING_TYPES.BLANK_ENGLISH,
      });
    } else if (lang === "malayalam") {
      setShowVerses({
        show: true,
        type: VERSES_SHOWING_TYPES.BLANK_MALAYALAM,
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              gutterBottom
            >
              Statistics
            </Typography>
            <Typography
              variant="caption"
              align="center"
              sx={{ color: "grey.600", fontSize: "0.75rem" }}
            >
              Log time: {now.toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant={isMobile ? "h6" : "h5"} align="center">
                  Total Bible Verses
                </Typography>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={100}
                    height={40}
                    style={{ margin: "0 auto" }}
                  />
                ) : (
                  <Typography variant="h4" align="center" color="primary">
                    {data?.totalVersesCount || 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant={isMobile ? "h6" : "h5"} align="center">
                  Total Sections
                </Typography>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width={100}
                    height={40}
                    style={{ margin: "0 auto" }}
                  />
                ) : (
                  <Typography variant="h4" align="center" color="primary">
                    {data?.totalSectionsCount || 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Button
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "small" : "medium"}
              onClick={showAllVersesHandler}
              style={{ marginTop: "10px" }}
            >
              Show all Bible Verse with section
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "small" : "medium"}
              onClick={() => showConditionalVersesHandler("english")}
              style={{ marginTop: "10px" }}
            >
              Show Bible Verses with blank english
            </Button>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "small" : "medium"}
              onClick={() => showConditionalVersesHandler("malayalam")}
              style={{ marginTop: "10px" }}
            >
              Show Bible Verses with blank malayalam
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Button
              variant="contained"
              color="secondary"
              fullWidth
              size={isMobile ? "small" : "medium"}
              style={{ marginTop: "10px" }}
            >
              Edit Section
            </Button> */}
          </Grid>
        </Grid>
      </Container>
      {showVerses?.show && <VersesTable type={showVerses?.type} />}
    </>
  );
};

export default Dashboard;
