import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RootState } from "../../store";
import {
  useAddSectionMutation,
  useAddVerseMutation,
  useGetSectionsMutation,
} from "../../store/verses/service";
import { BIBLE_BOOKS } from "../../utils/constants";
import { AdminSections } from "./sections";

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

  const [getSections, { isLoading }] = useGetSectionsMutation();
  const [addVerse, { isLoading: isAddingVerse }] = useAddVerseMutation();
  const [addSection, { isLoading: isAddingSection }] = useAddSectionMutation();
  const { sections = [] } = RootState()?.versesData;

  const LANGUAGE = "malayalam";

  useEffect(() => {
    getSectionsHandler();
  }, []);

  const getSectionsHandler = async () => {
    try {
      await getSections();
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await addVerse(data);
    } catch (error) {
      console.error("Error addVerse", error);
    }

    reset();
  };

  const handleSectionAdd = async (data) => {
    try {
      const sectionTitle = data?.english || "";
      const updatedData = { ...data, value: sectionTitle.toLowerCase() };
      await addSection(updatedData);
    } catch (error) {
      console.error("Error addSection", error);
    }

    reset();
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
          <AdminSections
            control={control}
            sections={sections}
            addNewSection={handleSectionAdd}
          />

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
