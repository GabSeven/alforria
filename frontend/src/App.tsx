import { useState, useRef, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.API_URL || 'http://127.0.0.1:8000'

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


function App() {
  const [professores, setProfessores] = useState<Record<string, Professor> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const arquivo = fileInputRef.current?.files?.[0];
    if (!arquivo) return;
    
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    const response = await fetch(`${API_URL}/professores`, {
      method: 'POST',
      body: formData
    });
    
    const dados = await response.json();
    setProfessores(dados);
    
    if (!idProfessorAtivo || !(dados?.[idProfessorAtivo] && professores?.[idProfessorAtivo])) setIdProfessorAtivo(Object.keys(dados)[0]);
    // console.log(dados);
  };

  const [idProfessorAtivo, setIdProfessorAtivo] = useState<string | null>(null);

  const avancarProfessor = () => {
    
    if (!professores || !idProfessorAtivo) return;
    
    const ids = Object.keys(professores);
    const indexAtual = ids.indexOf(idProfessorAtivo);
    const proximoIndex = (indexAtual + 1) % ids.length;
    setIdProfessorAtivo(ids[proximoIndex]);
  };

  const voltarProfessor = () => {
    
    if (!professores || !idProfessorAtivo) return;
    
    const ids = Object.keys(professores);
    const indexAtual = ids.indexOf(idProfessorAtivo);
    const proximoIndex = (indexAtual - 1 + ids.length) % ids.length; // % pode retornar valores negativos
    setIdProfessorAtivo(ids[proximoIndex]);
  };

    
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
        console.log(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [voltarProfessor, avancarProfessor]);

  return (
    <>
      
      
      <div className='root'>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".tsv" 
          ref={fileInputRef}
        />
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
          <button type="submit">
            🔍
          </button>
        </form>
        <div>
          <button className='side' onClick={voltarProfessor}>{"<"}</button>
          <main className='professor'>
            <header className='info-professor'>
              {idProfessorAtivo}-{professores[idProfessorAtivo].nome}
            </header>

            <article className='grades-e-disciplinas'>
              <section className='grades'>
                {/* grades */}
                <table className='grade-horarios'>
                  <caption>
                    Grade do 1o Semestre
                  </caption>

                </table>
                
                <table className='grade-horarios'>
                  <caption>
                    Grade do 2o Semestre
                  </caption>

                </table>
                
              </section>
              
              <section className='disciplinas-grupos'>
                
                <ul className='disciplinas'>
                  {professores[idProfessorAtivo].turmas.map(turma => {
                    return(<div title={turma.curso}>{turma.codigo_disciplina}-{turma.numero_turma} - {turma.nome_disciplina}</div>)
                  })}
                </ul>

                <ul className='grupos'></ul>
              </section>
              
              {!professores[idProfessorAtivo].observacao && ( 
              <section className='observacao'>
                observacao 123
              </section>)}
            </article>

          </main>
          <button className='side' onClick={avancarProfessor}>{">"}</button>
        </div>
      </>
      )}
      
      <div>
      {/* {professores.map(professor => {
        return(
          <div className="tabela-professor" key={professor.matricula}> {professor.nome}
          {professor.turmas.map(turma => {
            // return(<div className='disciplina'>{JSON.stringify(turma)}</div>)
            return(<div className='disciplina'>{`${turma.codigo_disciplina} - ${turma?.nome_disciplina}`}</div>)
          })}
          </div>
          
        )
      })} */}
      </div>
    </div>
    </>
  );
}
export default App
