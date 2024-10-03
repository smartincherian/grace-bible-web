import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Hidden,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  useGetAllVersesMutation,
  useGetVersesWithConditionMutation,
} from "../../store/verses/service";
import EditIcon from "@mui/icons-material/Edit";

const VersesTable = ({ type = "" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [verses, setVerses] = useState([]);
  const [getAllVerses, { isLoading }] = useGetAllVersesMutation();
  const [getConditionalVerses, { isLoading: isLoading2 }] =
    useGetVersesWithConditionMutation();
  useEffect(() => {
    fetchVersesHandler();
  }, [type]);

  const fetchVersesHandler = async () => {
    try {
      let res;
      if (type) {
        res = await getConditionalVerses({ condition: type });
      } else {
        res = await getAllVerses();
      }
      if (res?.data) {
        setVerses(res.data);
      }
    } catch (error) {
      console.error("[fetchVersesHandler]", error);
    }
  };

  const handleEdit = (id) => {
    const url = `/admin/verse/${id}`;
    window.open(url, "_blank");
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="Bible Verses Table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Book</TableCell>
            <TableCell>Chapter</TableCell>
            <TableCell>Verse</TableCell>
            <TableCell>Malayalam</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        {isLoading || isLoading2 ? (
          "Loading......"
        ) : (
          <TableBody>
            {verses.map((verse, index) => {
              // if (
              //   verse?.sectionTitles &&
              //   verse.sectionTitles.includes("Unknown Section")
              // ) {
              return (
                <TableRow key={index}>
                  <TableCell>{verse.id}</TableCell>
                  <TableCell>{String(verse.createdAt)}</TableCell>
                  <TableCell>{verse.book}</TableCell>
                  <TableCell>{verse.chapter}</TableCell>
                  <TableCell>{verse.verse}</TableCell>
                  <TableCell>{verse.malayalam}</TableCell>
                  <TableCell>{verse.english}</TableCell>
                  <TableCell>
                    {verse.sectionTitles ? verse.sectionTitles.join(", ") : ""}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(verse.id)} // Your edit handler function
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default VersesTable;
