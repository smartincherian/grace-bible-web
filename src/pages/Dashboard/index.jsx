import React, { useEffect } from "react";
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

const Dashboard = ({ type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [getStats, { isLoading, data }] = useGetStatsMutation();

  const now = new Date();

  useEffect(() => {
    getStatsHandler();
  }, []);

  const getStatsHandler = async () => {
    try {
      await getStats();
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  return (
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size={isMobile ? "small" : "medium"}
            style={{ marginTop: "10px" }}
          >
            Edit Bible Verse
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size={isMobile ? "small" : "medium"}
            style={{ marginTop: "10px" }}
          >
            Edit Section
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
