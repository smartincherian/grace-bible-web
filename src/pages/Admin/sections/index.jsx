import {
  Autocomplete,
  Button,
  Chip,
  Container,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SNACK_BAR_SEVERITY_TYPES,
  SnackbarContext,
} from "../../../components/Snackbar";
import useErrorToast from "../../../hooks/useErrorToast";
import { RootState } from "../../../store";
import {
  useGetSectionsMutation,
  useUpdateSectionMutation,
} from "../../../store/verses/service";

const AdminSectionsForm = () => {
  const { handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      tags: [],
    },
  });
  const { showSnackbar } = useContext(SnackbarContext);
  const showErrorMessage = useErrorToast();
  const [getSections, { isLoading }] = useGetSectionsMutation();
  const [updateSection, { isLoading: isUpdating }] = useUpdateSectionMutation();
  const { sections = [] } = RootState()?.versesData;

  const tags = watch("tags") || [];

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

  const handleSectionChange = (event) => {
    const selectedSection = sections.find(
      (section) => section.id === event.target.value
    );
    if (selectedSection) {
      const newTag = [selectedSection?.english, selectedSection?.malayalam];
      if (!tags.includes(newTag)) {
        console.log({ newTag });
        setValue("tags", [...tags, ...newTag]);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const { tags = [], sectionId } = data || {};
      const convertedTags = tags.map((tag) => {
        return /^[A-Za-z]+$/.test(tag) ? tag.toLowerCase() : tag;
      });
      const response = await updateSection({
        id: sectionId,
        tags: convertedTags,
      });
      if (response?.data) {
        showSnackbar(response?.data?.message, SNACK_BAR_SEVERITY_TYPES.SUCCESS);
        reset();
      } else {
        showErrorMessage({}, response?.data?.message);
      }
    } catch (error) {
      showErrorMessage(error);
      console.error("Error update section", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Section */}
          <Controller
            name="sectionId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                label="Section"
                variant="outlined"
                required
                value={field.value || []}
                onChange={(event) => {
                  field.onChange(event); // Update sectionId field value
                  handleSectionChange(event); // Call function to update tags
                }}
              >
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    <ListItemText
                      primary={`${section.english} (${section.malayalam})`}
                    />
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <Grid item xs={12}>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  freeSolo
                  options={[]}
                  onChange={(_, value) => field.onChange(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        key={index}
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

export default AdminSectionsForm;
