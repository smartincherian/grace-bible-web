import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { SnackbarProvider } from "./components/Snackbar";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/intention-add" element={<PrayerForm />} />
          <Route path="/intention-list" element={<IntentionsList />} />
          <Route path="/counter/:id" element={<Counter />} />
          <Route
            path="/intention-mother"
            element={<PrayerForm path={"mother"} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
