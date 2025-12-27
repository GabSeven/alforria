import { useState, useEffect, useCallback } from "react";
import "./../App.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router";

const API_URL = "http://127.0.0.1:8000";

interface Professor {
  matricula: string;
  nome: string;
  turmas: Turma[];
  observacao: string;
}

interface Turma {
  cod_disc: string;
  disciplina: string;
  turma: number;
  curso: string;
  carga_horaria: number;
}

// interface Grupo {
//   nome: string;
//   disciplinas: string[];
// }

export default function ProfessorDetalhes() {
  const [professores, setProfessores] = useState<Record<
    string,
    Professor
  > | null>(null);
  const [grupos, setGrupos] = useState<Record<string, string[]> | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await fetch(`${API_URL}/dados`);

        if (!response.ok) {
          navigate("/upload", {
            state: { error: "Dados não encontrados. Faça upload primeiro." },
          });
          return;
        }

        const dados = await response.json();
        setProfessores(dados.professores);
        setGrupos(dados.grupos);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="root">
      <ul>
        {professores &&
          Object.entries(professores).map(([matricula, professor]) => (
            <li>
              <Link to={`/professores/${matricula}`}>
                {matricula} - {professor.nome}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
