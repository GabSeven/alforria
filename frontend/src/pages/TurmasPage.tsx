import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "../theme/AppTheme";
import AppAppBar from "../components/AppAppBar";
import MainContent from "../components/MainContent";
import Latest from "../components/Latest";
import Footer from "../components/Footer";

import { Grid, Box } from "@mui/material";

const API_URL = "http://127.0.0.1:8000";

interface Turma {
  codigo: string;
  turma: string;
  nome: string;
  curso: string;
  carga_horaria: number;
}
export default function TurmasPage(props: { disableCustomTheme?: boolean }) {
  const [turmas, setTurmas] = useState<Turma[] | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarTurmas = async () => {
      try {
        const response = await fetch(`${API_URL}/turmas`);

        if (!response.ok) {
          navigate("/upload", {
            state: { error: "Dados não encontrados. Faça upload primeiro." },
          });
          return;
        }

        const turmas = await response.json();
        setTurmas(turmas);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    carregarTurmas();
  }, []);

  return (
    <>
      <Box
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {turmas &&
          turmas.map((turma) => (
            <div key={(turma.codigo, turma.turma)}>
              {turma.codigo} - {turma.turma}
            </div>
          ))}
      </Box>
    </>
  );
}
