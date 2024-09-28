import React, { useEffect } from "react";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetAllVersesMutation } from "../../store/verses/service";

const VersesTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [getAllVerses, { isLoading: isLoading, data: verses = [] }] =
    useGetAllVersesMutation();

  useEffect(() => {
    getAllVerses();
  }, []);

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
          </TableRow>
        </TableHead>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VersesTable;
