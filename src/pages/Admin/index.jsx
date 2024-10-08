import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RootState } from "../../store";
import {
  useAddSectionMutation,
  useAddVerseMutation,
  useCheckIfExistingVerseMutation,
  useGetSectionsMutation,
  useGetVerseMutation,
  useUpdateVerseMutation,
} from "../../store/verses/service";
import { BIBLE_BOOKS } from "../../utils/constants";
import {
  SNACK_BAR_SEVERITY_TYPES,
  SnackbarContext,
} from "../../components/Snackbar";
import useErrorToast from "../../hooks/useErrorToast";
import { AdminSections } from "./addSections";
import { useParams } from "react-router-dom";
import VerseDialog from "../../section/Card/VerseDialog";

const AdminVersesForm = ({ type }) => {
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      book: "",
      chapter: "",
      english: "",
      malayalam: "",
      verse: "",
    },
  });
  const { id } = useParams();
  const { showSnackbar } = useContext(SnackbarContext);
  const showErrorMessage = useErrorToast();
  const [getSections, { isLoading }] = useGetSectionsMutation();
  const [addVerse, { isLoading: isAddingVerse }] = useAddVerseMutation();
  const [addSection, { isLoading: isAddingSection }] = useAddSectionMutation();
  const [getVerse, { isLoading: isGettingVerse }] = useGetVerseMutation();
  const [updateVerse, { isLoading: isUpdating }] = useUpdateVerseMutation();
  const [checkUnique, { isLoading: isChecking }] =
    useCheckIfExistingVerseMutation();
  const { sections = [] } = RootState()?.versesData;
  const [showVerseCard, setShowVerseCard] = useState(false);
  const [wallpaperData, setWallpaperData] = useState(null);
  const [showNewVerseForm, setShowNewVerseForm] = useState();

  useEffect(() => {
    getSectionsHandler();
    if (id) {
      verseEditHandler();
    }
  }, []);

  const verseEditHandler = async () => {
    const res = await getVerse(id);
    reset(res?.data);
  };

  const getSectionsHandler = async () => {
    try {
      await getSections();
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (type === "admin") {
        let response;
        if (!id) {
          if (!data.english && !data.malayalam) {
            showErrorMessage(
              {},
              "Verse : Either Malayalam or English is required"
            );
            return;
          }
          response = await addVerse(data);
        } else {
          response = await updateVerse(data);
          verseEditHandler();
        }
        if (response?.data?.success) {
          showSnackbar(
            response?.data?.message,
            SNACK_BAR_SEVERITY_TYPES.SUCCESS
          );
        } else {
          showErrorMessage({}, response?.data?.message);
        }
      } else {
        setWallpaperData(data);
        setShowVerseCard(true);
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

  const book = watch("book");
  const chapter = watch("chapter");
  const verse = watch("verse");

  useEffect(() => {
    if (book && chapter && verse && !id) {
      checkUniqueVerse();
    }
  }, [book, chapter, verse]);

  const checkUniqueVerse = async () => {
    const { data } = await checkUnique({ book, chapter, verse });
    if (data?.isUnique) {
      setShowNewVerseForm(true);
    } else {
      showErrorMessage({}, data?.message);
      setShowNewVerseForm(false);
    }
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
          {type === "admin" ? (
            <>
              {(showNewVerseForm || id) && (
                <>
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
                          helperText={"Maximum length : 300"}
                          inputProps={{ maxLength: 300 }}
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
                          helperText={"Maximum length : 300"}
                          inputProps={{ maxLength: 300 }}
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
                </>
              )}
            </>
          ) : (
            <Grid item xs={12}>
              <Controller
                name="malayalam"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Verse"
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Ex : For nothing will be impossible with God"
                  />
                )}
              />
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {type === "wallpaper" && showVerseCard && wallpaperData && (
        <Grid mt={5}>
          <VerseDialog
            verse={wallpaperData}
            open={showVerseCard}
            isWallpaper
            onClose={() => setShowVerseCard(false)}
          />
        </Grid>
      )}
    </Container>
  );
};

export default AdminVersesForm;
