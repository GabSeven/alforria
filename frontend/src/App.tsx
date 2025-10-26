import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = import.meta.env.API_URL || 'http://127.0.0.1:8000'

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dados, setDados] = useState<JSON | null>(null);

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!arquivo) return;
    const response = await fetch(`${API_URL}/professores`, {
      method: 'POST',
      body: arquivo
    });
    const dados = await response.json()
    setDados(dados);
  };
  
  const handleButton = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/professores`, {
      method: 'GET'
    });
    const dados = await response.json()
    setDados(dados);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <input 
          type="file" 
          accept=".tsv" 
          ref={fileInputRef} 
        />
        <button type="submit">Enviar arquivo</button>
      </form>
      <button onClick={handleButton}> aa</button>
      {!dados && (
        <>calma</>
      )} 
      {dados && (
        <>oi</>
      )} 
    </>
  );
}
export default App
