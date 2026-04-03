import { useApp } from "@/context/AppContext"
import { useParams, useNavigate } from "react-router"
import { useEffect } from "react"
import { ProfessorTimetable } from "@/components/Timetable"
import { ProfessorSidebar } from "@/components/ProfessorSidebar"
import type { Professor } from "@types"

export default function ProfessorDetalhesPage() {
  const { professores } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()

  const indiceAtual =
    professores?.findIndex((p) => String(p.matricula) === id) ?? -1
  const professor = professores?.[indiceAtual]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || !professores) return
      if (e.key === "ArrowRight") {
        const proximo = (indiceAtual + 1) % professores.length
        navigate(`/professores/${professores[proximo].matricula}`)
      }
      if (e.key === "ArrowLeft") {
        const anterior =
          (indiceAtual - 1 + professores.length) % professores.length
        navigate(`/professores/${professores[anterior].matricula}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [indiceAtual, professores])

  if (!professor) return <p>Professor não encontrada</p>

  console.log(professor.prefHorarios)

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      <ProfessorSidebar professor={professor} />
      <main className="flex-1 overflow-auto p-6">
        <div className="flex gap-6">
          <ProfessorTimetable professor={professor} semestre={1} />
          <ProfessorTimetable professor={professor} semestre={2} />
        </div>
      </main>
      <aside className="w-60 min-w-60 overflow-auto border-l border-border p-4">
        {/* conteúdo futuro */}
      </aside>
    </div>
  )
}
