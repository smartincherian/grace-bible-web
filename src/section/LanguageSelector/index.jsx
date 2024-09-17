import { FormControl, MenuItem, Select, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentLanguage } from "../../store/localization/slice";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const languages = [
  { value: "malayalam", name: "Malayalam", label: "മലയാളം" },
  { value: "english", name: "English", label: "English" },
];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  maxWidth: 150,
  margin: theme.spacing(1),
  display: "flex",
  justifyContent: "flex-end", // Right alignment
  "& .MuiInputBase-root": {
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },
  },
  "& .MuiSelect-select": {
    padding: "8px 14px",
    fontSize: "0.875rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Removing any remaining border
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 100,
    maxWidth: 130,
    "& .MuiSelect-select": {
      padding: "6px 10px",
      fontSize: "0.75rem",
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "0.875rem",
  padding: "6px 14px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    padding: "4px 10px",
  },
}));

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(() => {
    const storedLanguage = getLocalStorage("language");
    return storedLanguage || "malayalam";
  });

  useEffect(() => {
    setLocalStorage("language", language);
    dispatch(setCurrentLanguage(language));
  }, [language]);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <StyledFormControl variant="outlined">
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        renderValue={(value) => {
          const lang = languages.find((l) => l.value === value);
          return lang ? lang.label : null;
        }}
      >
        {languages.map((lang) => (
          <StyledMenuItem key={lang.value} value={lang.value}>
            {lang.label}
          </StyledMenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default LanguageSelector;
