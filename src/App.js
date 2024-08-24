import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SnackbarProvider } from "./components/Snackbar";
import Verses from "./pages/Verses";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sections/:id" element={<Verses />} />
            {/* <Route path="/intention-add" element={<PrayerForm />} />
          <Route path="/intention-list" element={<IntentionsList />} />
          
          <Route
            path="/intention-mother"
            element={<PrayerForm path={"mother"} />}
          /> */}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
