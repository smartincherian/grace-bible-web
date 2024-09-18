import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
  Autocomplete,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalization from "../../hooks/useLocalization";
import { RootState } from "../../store";
import {
  useGetTagsMutation,
  useSearchSectionsMutation,
} from "../../store/verses/service";

const SearchComponent = () => {
  const navigate = useNavigate();
  const { translate } = useLocalization();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchSection, { isLoading: isSearching }] =
    useSearchSectionsMutation();
  const [getTags, { isLoading: isLoading }] = useGetTagsMutation();
  const { sections = [], tags = [] } = RootState()?.versesData;
  useEffect(() => {
    getTags();
  }, []);
  useEffect(() => {
    if (sections && sections?.length) {
      const result = sections.map((item) => ({
        value: item.value,
        label: `${item.english} ${item.malayalam}`,
      }));
      setSearchOptions(result);
    }
  }, [sections]);

  const handleSearch = async () => {
    try {
      setIsSearchApplied(true);
      const convertedSearch = /^[A-Za-z]+$/.test(searchTerm)
        ? searchTerm.toLowerCase()
        : searchTerm;
      await searchSection(convertedSearch);
    } catch (error) {}
  };

  const clearSearch = async () => {
    try {
      setSearchTerm("");
      setIsSearchApplied(false);
      await searchSection("");
    } catch (error) {}
  };

  return (
    <>
      <Typography variant="h6" align="center" mt={3}>
        {translate("search-topic")}
      </Typography>
      <Grid item xs={12} sm={4} my={3}>
        <Autocomplete
          autoSelect
          freeSolo
          options={tags}
          value={
            searchOptions.find((option) => option.label === searchTerm) || null
          }
          onChange={(event, newValue) => {
            if (newValue?.value) {
              setSearchTerm(newValue.value);
            } else if (newValue) {
              setSearchTerm(newValue);
            } else {
              setSearchTerm("");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search with keywords"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex : Faith | വിശ്വാസം"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="end">
                      {isSearchApplied ? (
                        <IconButton
                          onClick={clearSearch}
                          edge="end"
                          sx={{ color: "#E91E63" }}
                        >
                          <SearchOffIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={handleSearch}
                          edge="end"
                          color="primary"
                          disabled={!searchTerm}
                        >
                          <SearchIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      {!isSearchApplied && (
        <Typography variant="h6" align="center" mt={3}>
          {translate("choose-topic")}
        </Typography>
      )}
    </>
  );
};

export default SearchComponent;
