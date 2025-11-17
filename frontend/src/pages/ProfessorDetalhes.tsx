import { useState, useEffect, useCallback } from "react";
import "./../App.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

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

  const avancarProfessor = useCallback(() => {
    if (!professores || !id) return;

    const ids = Object.keys(professores || {});
    const idAtual = ids.indexOf(id!);
    const proximoId = ids[(idAtual + 1) % ids.length];

    navigate(`/professores/${proximoId}`);
  }, [navigate, id, professores]);

  const voltarProfessor = useCallback(() => {
    if (!professores || !id) return;

    const ids = Object.keys(professores || {});
    const idAtual = ids.indexOf(id!);
    const anteriorId = ids[(idAtual - 1 + ids.length) % ids.length]; // % pode retornar valores negativos

    navigate(`/professores/${[anteriorId]}`);
  }, [navigate, id, professores]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        voltarProfessor();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        avancarProfessor();
      } else if (e.key === "f" && e.ctrlKey) {
        e.preventDefault();
        console.log("oii");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [voltarProfessor, avancarProfessor]);
  if (!professores || !id || !professores[id]) {
    return <div className="root">Carregando professor {id}...</div>;
  }

  const professor = professores[id];

  return (
    <div className="root">
      <div>
        <button className="side" onClick={voltarProfessor}>
          {"<"}
        </button>
        <main className="professor">
          <header className="info-professor">
            {id}-{professor.nome}
            Carga Horária:{" "}
            {professor.turmas.reduce(
              (sum, turma) => sum + turma.carga_horaria,
              0,
            )}
          </header>

          <article className="grades-e-disciplinas">
            <section className="grades">
              <table className="grade-horarios">
                <caption>Grade do 1o Semestre</caption>
              </table>
              <table className="grade-horarios">
                <caption>Grade do 2o Semestre</caption>
              </table>
            </section>

            <section className="disciplinas-grupos">
              <ul className="disciplinas">
                {professor.turmas.map((turma, index) => (
                  <li
                    key={`${turma.cod_disc}-${turma.turma}-${index}`}
                    title={turma.curso}
                  >
                    {turma.cod_disc}-{turma.turma} - {turma.disciplina}
                  </li>
                ))}
              </ul>

              <ul className="grupos">
                {grupos &&
                  Object.entries(grupos).map(([nomeGrupo]) => (
                    <li key={nomeGrupo}>{nomeGrupo}</li>
                  ))}
              </ul>
            </section>

            {!professor.observacao && (
              <section className="observacao">observacao 123</section>
            )}
          </article>
        </main>
        <button className="side" onClick={avancarProfessor}>
          {">"}
        </button>
      </div>
    </div>
  );
}
