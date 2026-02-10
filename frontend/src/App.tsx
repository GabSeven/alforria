import { Routes, Route, Navigate } from "react-router";
import Professores from "./pages/Professores";
// import Grupos from "./pages/Grupos"
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./theme/AppTheme";
import AppAppBar from "./components/AppAppBar";
import MainContent from "./components/MainContent";
import Latest from "./components/Latest";
import Footer from "./components/Footer";
import Typography from "@mui/material/Typography";
import GruposPage from "./pages/GruposPage";
import TurmasPage from "./pages/TurmasPage";
import MainPage from "./pages/MainPage";

export default function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*<Route path="/upload" element={<UploadPage />} />*/}
        <Route path="/grupos" element={<GruposPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/professores" element={<Professores />} />
        {/*<Route path="/professores/:id" element={<ProfessorDetalhes />} />*/}
        {/*<Route path="/grupos" element={<GruposPage />} />*/}
      </Routes>

      <Footer />
    </AppTheme>
  );
}
