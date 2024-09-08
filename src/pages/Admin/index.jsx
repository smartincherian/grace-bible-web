import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Grid,
  Autocomplete,
} from "@mui/material";
import { BIBLE_BOOKS } from "../../utils/constants";

const AdminVersesForm = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      book: "",
      chapter: "",
      english: "",
      malayalam: "",
      section: "",
      verse: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Do something with the form data
    reset(); // Reset form after submission
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Book */}
          <Grid item xs={12}>
            <Controller
              name="book"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  autoSelect
                  options={BIBLE_BOOKS}
                  value={
                    BIBLE_BOOKS.find((book) => book.value === value) || null
                  }
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.value : null);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Book"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* Chapter */}
          <Grid item xs={12}>
            <Controller
              name="chapter"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Chapter"
                  variant="outlined"
                  required
                  placeholder="Ex : 1"
                />
              )}
            />
          </Grid>

          {/* Verse */}
          <Grid item xs={12}>
            <Controller
              name="verse"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Verse Number"
                  variant="outlined"
                  required
                  placeholder="Ex : 37"
                />
              )}
            />
          </Grid>

          {/* Malayalam */}
          <Grid item xs={12}>
            <Controller
              name="malayalam"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Malayalam"
                  variant="outlined"
                  multiline
                  rows={3}
                  required
                  placeholder="Ex : ദൈവത്തിന് ഒന്നും അസാധ്യമല്ല"
                />
              )}
            />
          </Grid>

          {/* English */}
          <Grid item xs={12}>
            <Controller
              name="english"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="English"
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Ex : For nothing will be impossible with God"
                />
              )}
            />
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Section"
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AdminVersesForm;
