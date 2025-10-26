import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = import.meta.env.API_URL || 'http://127.0.0.1:8000'

interface Professor {
  matricula: string;
  nome: string;
  turmas: Turma[];
}

interface Turma {
  codigo_disciplina: string;
  nome_disciplina: string;
  numero_turma: number;
  curso: string;
}


function App() {
  const [dados, setDados] = useState<Professor[] | null>(null);
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
    setDados(dados);
  };

  const professores = dados ? Object.values(dados) : [];
  
  return (
    <div className='root'>
      {!dados && (
        <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".tsv" 
          ref={fileInputRef}
        />
        <button type="submit">Enviar arquivo</button>
      </form>
      )}
      {dados && (
        <>
        <button className='side'>{"<"}</button>
        <main className='professor'>
          <header className='info-professor'>
            {/* <h1>Nome do Professor</h1> */}
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

              </ul>

              <ul className='grupos'></ul>
            </section>
          </article>

        </main>
        <button className='side'>{">"}</button>
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
  );
}
export default App
