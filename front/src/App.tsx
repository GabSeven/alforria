import { Routes, Route, Navigate } from "react-router"
import Header from "@/components/Header"
import {
  MainPage,
  GruposPage,
  TurmasPage,
  TurmaDetalhesPage,
  ProfessoresPage,
} from "@/pages"
export default function App() {
  return (
    <div className="100vw max-h-screen flex-col px-6 py-3">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*<Route path="/upload" element={<UploadPage />} />*/}
        <Route path="/grupos" element={<GruposPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/turmas/:id" element={<TurmaDetalhesPage />} />
        <Route path="/professores" element={<ProfessoresPage />} />
        {/*<Route path="/professores/:id" element={<ProfessorDetalhes />} />*/}
        {/*<Route path="/grupos" element={<GruposPage />} />*/}
      </Routes>
    </div>
  )
}

// export default function App(props: { disableCustomTheme?: boolean }) {
//   return (
//     <AppTheme {...props}>
//       <CssBaseline enableColorScheme />
//       <AppAppBar />

//       {/*<Footer />*/}
//     </AppTheme>
//   );
// }
