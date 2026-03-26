export const DiaSemana = {
  Segunda: 2,
  Terca: 3,
  Quarta: 4,
  Quinta: 5,
  Sexta: 6,
  Sabado: 7,
} as const

export type DiaSemana = (typeof DiaSemana)[keyof typeof DiaSemana]

export interface Horario {
  dia: DiaSemana
  horario: number
}
