import { useApp } from "@/context/AppContext"
import { useParams, useNavigate } from "react-router"
import { useEffect } from "react"
import type { Turma } from "@types"

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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold">{turma.nome}</h1>
      <p>Código: {turma.codigo}</p>
      <p>Turma: {turma.turma}</p>
      <p>Curso: {turma.curso}</p>
      <p>Carga Horária: {turma.cargaHoraria}</p>
    </div>
  )
}
