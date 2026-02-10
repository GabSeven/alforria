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

function Grupos() {
  return <Grid container spacing={2} columns={12}></Grid>;
}

interface Grupo {
  id: string;
  canonico: boolean;
  disciplinas: string[];
}

export default function GruposPage(props: { disableCustomTheme?: boolean }) {
  const [grupos, setGrupos] = useState<Grupo[] | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarGrupos = async () => {
      try {
        const response = await fetch(`${API_URL}/grupos`);

        if (!response.ok) {
          navigate("/upload", {
            state: { error: "Dados não encontrados. Faça upload primeiro." },
          });
          return;
        }

        const grupos = await response.json();
        setGrupos(grupos);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    carregarGrupos();
  }, []);

  return (
    <>
      <Box
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {grupos && grupos.map((grupo) => <div key={grupo.id}>{grupo.id}</div>)}
      </Box>
    </>
  );
}
