import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RootState } from "../../store";
import {
  useAddSectionMutation,
  useAddVerseMutation,
  useGetSectionsMutation,
} from "../../store/verses/service";
import { BIBLE_BOOKS } from "../../utils/constants";
import {
  SNACK_BAR_SEVERITY_TYPES,
  SnackbarContext,
} from "../../components/Snackbar";
import useErrorToast from "../../hooks/useErrorToast";
import { AdminSections } from "./addSections";

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
  const { showSnackbar } = useContext(SnackbarContext);
  const showErrorMessage = useErrorToast();
  const [getSections, { isLoading }] = useGetSectionsMutation();
  const [addVerse, { isLoading: isAddingVerse }] = useAddVerseMutation();
  const [addSection, { isLoading: isAddingSection }] = useAddSectionMutation();
  const { sections = [] } = RootState()?.versesData;

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
      const response = await addVerse(data);
      if (response?.data?.success) {
        showSnackbar(response?.data?.message, SNACK_BAR_SEVERITY_TYPES.SUCCESS);
        reset();
      } else {
        showErrorMessage({}, response?.data?.message);
      }
    } catch (error) {
      showErrorMessage(error);
      console.error("Error addVerse", error);
    }
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
