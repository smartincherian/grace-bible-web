import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SnackbarProvider } from "./components/Snackbar";
import Verses from "./pages/Verses";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import AdminVersesForm from "./pages/Admin";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sections/:id" element={<Verses />} />
            <Route path="/admin" element={<AdminVersesForm />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
