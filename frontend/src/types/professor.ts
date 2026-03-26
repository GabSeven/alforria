import type { ColumnDef } from "@tanstack/react-table"

import type { Turma } from "./turma"

export interface Professor {
  matricula: string
  nomeCompleto: string
  turmas: Turma[]
  observacao: string
}

export const columns: ColumnDef<Professor>[] = [
  {
    accessorKey: "matricula",
    header: "Matrícula",
  },
  {
    accessorKey: "nomeCompleto",
    header: "Nome",
  },
  // {
  //   accessorKey: "semestralidade",
  //   header: "Semestre",
  // },
]
