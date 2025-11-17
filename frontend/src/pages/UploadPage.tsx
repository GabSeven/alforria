import { useRef } from "react";
import "./../App.css";
import { useNavigate } from "react-router";

const API_URL = "http://127.0.0.1:8000";

export default function UploadPage() {
  const professorFile = useRef<HTMLInputElement>(null);
  const gruposFile = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const arquivoProf = professorFile.current?.files?.[0];
    if (!arquivoProf) return;

    const arquivoGrupos = gruposFile.current?.files?.[0];
    if (!arquivoGrupos) return;

    const formData = new FormData();
    formData.append("professores", arquivoProf);
    formData.append("grupos", arquivoGrupos);

    await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    navigate("/professores");
  };

  return (
    <>
      <div className="root">
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".tsv" ref={professorFile} />
          <input type="file" accept=".txt" ref={gruposFile} />
          <button type="submit">Enviar arquivo</button>
        </form>
      </div>
    </>
  );
}
