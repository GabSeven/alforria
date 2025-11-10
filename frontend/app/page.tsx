import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

interface Professor {
  matricula: string;
  nome: string;
  turmas: Turma[];
  observacao: string;
}

interface Turma {
  codigo_disciplina: string;
  nome_disciplina: string;
  numero_turma: number;
  curso: string;
}

// interface Grupo {
//   nome: string;
//   disciplinas: string[];
// }

function App() {
  const [professores, setProfessores] = useState<Record<
    string,
    Professor
  > | null>(null);
  const [grupos, setGrupos] = useState<Record<string, string[]> | null>(null);
  const professorFile = useRef<HTMLInputElement>(null);
  const gruposFile = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const arquivoProf = professorFile.current?.files?.[0];
    if (!arquivoProf) return;

    const arquivoGrupos = gruposFile.current?.files?.[0];
    if (!arquivoGrupos) return;

    const formData = new FormData();
    formData.append("professores", arquivoProf);
    formData.append("grupos", arquivoGrupos);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const dados = await response.json();
    setProfessores(dados.professores);
    setGrupos(dados.grupos);
    console.log(professores);
    console.log(grupos);

    if (
      !idProfessorAtivo ||
      !(
        dados.professores?.[idProfessorAtivo] && professores?.[idProfessorAtivo]
      )
    )
      setIdProfessorAtivo(Object.keys(dados.professores)[0]);
  };

  const [idProfessorAtivo, setIdProfessorAtivo] = useState<string | null>(null);

  const avancarProfessor = useCallback(() => {
    if (!professores || !idProfessorAtivo) return;

    const ids = Object.keys(professores);
    const indexAtual = ids.indexOf(idProfessorAtivo);
    const proximoIndex = (indexAtual + 1) % ids.length;
    setIdProfessorAtivo(ids[proximoIndex]);
  }, [professores, idProfessorAtivo]);

  const voltarProfessor = useCallback(() => {
    if (!professores || !idProfessorAtivo) return;

    const ids = Object.keys(professores);
    const indexAtual = ids.indexOf(idProfessorAtivo);
    const proximoIndex = (indexAtual - 1 + ids.length) % ids.length; // % pode retornar valores negativos
    setIdProfessorAtivo(ids[proximoIndex]);
  }, [professores, idProfessorAtivo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return; // ← Permite digitação normal
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
      } else {
        e.preventDefault();
        // console.log(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [voltarProfessor, avancarProfessor]);

  return (
    <>
      <div className="root">
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".tsv" ref={professorFile} />
          <input type="file" accept=".txt" ref={gruposFile} />
          <button type="submit">Enviar arquivo</button>
        </form>
        {professores && idProfessorAtivo && (
          <>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                // Sua lógica de busca
              }}
              className="caixa-busca"
            >
              <label htmlFor="busca-professores" className="sr-only">
                Buscar professores, disciplinas ou cursos
              </label>
              <input
                id="busca-professores"
                type="search"
                placeholder="Buscar professores, disciplinas ou cursos..."
                // value={termoBusca}
                // onChange={(e) => setTermoBusca(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>
            <div>
              <button className="side" onClick={voltarProfessor}>
                {"<"}
              </button>
              <main className="professor">
                <header className="info-professor">
                  {idProfessorAtivo}-{professores[idProfessorAtivo].nome}
                </header>

                <article className="grades-e-disciplinas">
                  <section className="grades">
                    {/* grades */}
                    <table className="grade-horarios">
                      <caption>Grade do 1o Semestre</caption>
                    </table>

                    <table className="grade-horarios">
                      <caption>Grade do 2o Semestre</caption>
                    </table>
                  </section>

                  <section className="disciplinas-grupos">
                    <ul className="disciplinas">
                      {professores[idProfessorAtivo].turmas.map((turma) => {
                        return (
                          <li title={turma.curso}>
                            {turma.codigo_disciplina}-{turma.numero_turma} -{" "}
                            {turma.nome_disciplina}
                          </li>
                        );
                      })}
                    </ul>

                    <ul className="grupos">
                      {" "}
                      {/*{grupos &&
                        Object.entries(grupos).map(
                          ([nomeGrupo, disciplinas]) => {
                            return <li> {nomeGrupo} </li>;
                          },
                        )}{" "}*/}
                    </ul>
                  </section>

                  {!professores[idProfessorAtivo].observacao && (
                    <section className="observacao">observacao 123</section>
                  )}
                </article>
              </main>
              <button className="side" onClick={avancarProfessor}>
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default App;
