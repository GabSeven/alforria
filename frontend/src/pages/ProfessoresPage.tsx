import { columns } from "@/types/professor"
import { DataTable } from "@/components/ui/data-table"
import { useApp } from "@/context/AppContext"
import { useNavigate } from "react-router"
import type { Professor, Turma } from "@/types"

export default function ProfessoresPage() {
  const { professores } = useApp()
  const navigate = useNavigate()

  const getId = (professor: Professor) => `${professor.matricula}`

  return (
    <div className="container mx-auto max-h-dvh py-10">
      {professores && (
        <DataTable
          columns={columns}
          data={professores}
          onRowClick={(professor) =>
            navigate(`/professores/${getId(professor)}`)
          }
        />
      )}
    </div>
  )
}
