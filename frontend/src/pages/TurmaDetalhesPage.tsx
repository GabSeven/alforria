import { useApp } from "@/context/AppContext"
import { useParams, useNavigate } from "react-router"
import { useEffect } from "react"
import type { Turma } from "@/types"
import { TurmaTimetable as Timetable } from "@/components/Timetable"

export default function TurmaDetalhesPage() {
  const { turmas } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()

  const getId = (t: Turma) => `${t.codigo}-${t.turma}-${t.semestralidade}`

  const indiceAtual = turmas?.findIndex((t) => getId(t) === id) ?? -1
  const turma = turmas?.[indiceAtual]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!turmas) return

      if (e.key === "ArrowRight") {
        const proximo = (indiceAtual + 1) % turmas.length
        navigate(`/turmas/${getId(turmas[proximo])}`)
      }
      if (e.key === "ArrowLeft") {
        const anterior = (indiceAtual - 1 + turmas.length) % turmas.length
        navigate(`/turmas/${getId(turmas[anterior])}`)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [indiceAtual, turmas])

  if (!turma) return <p>Turma não encontrada</p>

  return (
    <div className="container mx-auto space-y-6 py-10">
      <div>
        <h1 className="text-2xl font-medium">{turma.nome}</h1>
        <p className="text-muted-foreground">
          {turma.curso} · Turma {turma.turma}
        </p>
        <p className="text-muted-foreground">
          {turma.semestralidade}o Semestre
        </p>
      </div>
      <div className="flex-row">
        <Timetable turma={turma} />
        <Timetable turma={turma} />
      </div>
    </div>
  )
}
