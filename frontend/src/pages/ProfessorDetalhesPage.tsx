import { useApp } from "@/context/AppContext"
import { useParams, useNavigate } from "react-router"
import { useEffect } from "react"
import type { Professor } from "@types"
import { ProfessorTimetable } from "@/components/Timetable"

export default function ProfessorDetalhesPage() {
  const { professores, turmas } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()

  const getId = (professor: Professor) => `${professor.matricula}`

  const indiceAtual = professores?.findIndex((p) => getId(p) === id) ?? -1
  const professor = professores?.[indiceAtual]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!professores) return

      if (e.key === "ArrowRight") {
        const proximo = (indiceAtual + 1) % professores.length
        navigate(`/professores/${getId(professores[proximo])}`)
      }
      if (e.key === "ArrowLeft") {
        const anterior =
          (indiceAtual - 1 + professores.length) % professores.length
        navigate(`/professores/${getId(professores[anterior])}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [indiceAtual, professores])

  if (!professor) return <p>Professor não encontrada</p>

  console.log(professor.prefHorarios)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold">{professor.nomeCompleto}</h1>
      <p>Mátricula: {professor.matricula}</p>
      <p>Observacao: {professor.observacao}</p>
      <div className="flex flex-row">
        <ProfessorTimetable professor={professor} semestre={1} />
        <ProfessorTimetable professor={professor} semestre={2} />
      </div>
    </div>
  )
}
