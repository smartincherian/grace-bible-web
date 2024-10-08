import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SnackbarProvider } from "./components/Snackbar";
import Verses from "./pages/Verses";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import AdminVersesForm from "./pages/Admin";
import AdminSectionsForm from "./pages/Admin/sections";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Home copy";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/sections/:id" element={<Verses />} />
            <Route path="/admin" element={<AdminVersesForm type="admin" />} />
            <Route path="/admin/section" element={<AdminSectionsForm />} />
            <Route
              path="/wallp"
              element={<AdminVersesForm type="wallpaper" />}
            />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/verse/:id"
              element={<AdminVersesForm type="admin" />}
            />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
