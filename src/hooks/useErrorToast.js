import { useCallback, useContext } from "react";
import {
  SNACK_BAR_SEVERITY_TYPES,
  SnackbarContext,
} from "../components/Snackbar";

const useErrorToast = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  const showErrorMessage = useCallback(
    (error, defaultMessage = "An unexpected error occurred") => {
      const errorMessage =
        error?.data?.error || error?.message || error?.error || defaultMessage;
      showSnackbar(errorMessage, SNACK_BAR_SEVERITY_TYPES.ERROR);
    },
    [showSnackbar]
  );

  return showErrorMessage;
};

export default useErrorToast;
