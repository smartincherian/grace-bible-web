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
} from "@mui/material";
import { Controller } from "react-hook-form";

export const AdminSections = ({ control, sections, addNewSection }) => {
  const [open, setOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    english: "",
    malayalam: "",
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
      setNewSection({ english: "", malayalam: "" });
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
          )}
        />
        {/* Button to add new section */}
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mt: 2 }}>
          Add New Section
        </Button>
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
