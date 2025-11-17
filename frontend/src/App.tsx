import { Routes, Route, Navigate } from "react-router";
import UploadPage from "./pages/UploadPage";
// import Teste from "./pages/teste";
// import VisualizacaoPage fro./pages/ProfessorDetalhesage";
import ProfessorDetalhes from "./pages/ProfessorDetalhes";
// import GruposPage from "./pages/GruposPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/professores" replace />} />
      <Route path="/upload" element={<UploadPage />} />
      {/*<Route path="visualizar" element={<VisualizacaoPage />} />*/}
      <Route
        path="/professores"
        element={<Navigate to="/professores/00000002" replace />}
      />
      <Route path="/professores/:id" element={<ProfessorDetalhes />} />
      {/*<Route path="/grupos" element={<GruposPage />} />*/}
    </Routes>
  );
}
