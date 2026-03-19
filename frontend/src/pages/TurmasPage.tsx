import { columns } from "@/types/turma"
import { DataTable } from "@/components/ui/data-table"
import { useApp } from "@/context/AppContext"
import { useNavigate } from "react-router"
import type { Turma } from "@/types"

export default function TurmasPage() {
  const { turmas } = useApp()
  const navigate = useNavigate()

  const getId = (turma: Turma) =>
    `${turma.codigo}-${turma.turma}-${turma.semestralidade}`

  return (
    <div className="container mx-auto max-h-dvh py-10">
      {turmas && (
        <DataTable
          columns={columns}
          data={turmas}
          onRowClick={(turma) => navigate(`/turmas/${getId(turma)}`)}
        />
      )}
    </div>
  )
}
