import type { ColumnDef } from "@tanstack/react-table"

export interface Turma {
  nome: string
  codigo: string
  turma: number
  semestralidade: number
  curso: string
  cargaHoraria: number
}

export const columns: ColumnDef<Turma>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "codigo",
    header: "Código",
  },
  {
    accessorKey: "semestralidade",
    header: "Semestre",
  },
  {
    accessorKey: "turma",
    header: "Turma",
  },
  {
    accessorKey: "cargaHoraria",
    header: "Carga Horária",
  },
  {
    accessorKey: "curso",
    header: "Curso",
  },
]
