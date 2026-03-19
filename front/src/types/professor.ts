import type { Turma } from "./turma"

export interface Professor {
  matricula: string
  nome: string
  turmas: Turma[]
  observacao: string
}
