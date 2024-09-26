import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const AdminSections = ({ control, sections, addNewSection }) => {
  const [open, setOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    english: "",
    malayalam: "",
    tags: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSection = () => {
    if (newSection.english.trim() && newSection.malayalam.trim()) {
      addNewSection(newSection);
      setOpen(false);
      setNewSection({ english: "", malayalam: "", tags: [] });
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="sectionIds"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" required>
              <InputLabel id="section-label">Section</InputLabel>
              <Select
                {...field}
                multiple
                fullWidth
                label="Section"
                variant="outlined"
                required
                value={field.value || []}
                renderValue={(selected) =>
                  selected
                    .map((id) => sections.find((s) => s.id === id)?.english)
                    .join(", ")
                }
              >
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    <Checkbox checked={field.value.indexOf(section.id) > -1} />
                    <ListItemText
                      primary={`${section.english} (${section.malayalam})`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {/* Button to add new section */}
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mt: 2 }}>
          Add New Section
        </Button>
        <Grid>
          <Typography variant="caption" color={"primary"}>
            Please add new section only if the same is not present in existing
            sections in the above drop down
          </Typography>
        </Grid>
      </Grid>

      {/* Dialog for adding new section */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="English"
            fullWidth
            variant="outlined"
            value={newSection.english}
            onChange={(e) =>
              setNewSection({ ...newSection, english: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Malayalam"
            fullWidth
            variant="outlined"
            value={newSection.malayalam}
            onChange={(e) =>
              setNewSection({ ...newSection, malayalam: e.target.value })
            }
          />
          <Grid item xs={12} mt={1}>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              onChange={(_, value) => {
                setNewSection((prev) => ({ ...prev, tags: value }));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Tags"
                  placeholder="Enter tags"
                />
              )}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSection} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
