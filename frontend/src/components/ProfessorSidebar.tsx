// components/ProfessorSidebar.tsx
import type { Professor } from "@/types"
import { useApp } from "@/context/AppContext"

interface Props {
  professor: Professor
}

export function ProfessorSidebar({ professor }: Props) {
  const { turmas } = useApp()

  const turmasDoProfessor =
    turmas?.filter((t) => professor.turmas.includes(t.codigo)) ?? []

  const insatTotal = professor.insatisfacao
  const insatDetalhes = [
    { label: "Horário", valor: professor.insatHorario },
    { label: "Disciplinas", valor: professor.insatDisciplinas },
    { label: "Carga horária", valor: professor.insatCargaHoraria },
    { label: "Janelas", valor: professor.insatJanelas },
    { label: "Distintas", valor: professor.insatDistintas },
    { label: "Manhã/Noite", valor: professor.insatManhaNoite },
  ]

  return (
    <aside className="flex w-56 min-w-56 flex-col gap-4 overflow-auto border-r border-border bg-muted/30 p-4">
      {/* Nome e badges */}
      <div>
        <p className="text-base font-medium">{professor.nomeCompleto}</p>
        <p className="text-xs text-muted-foreground">
          Mat. {professor.matricula}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {professor.temporario && (
            <span className="bg-warning/20 text-warning-foreground rounded px-2 py-0.5 text-xs">
              Temporário
            </span>
          )}
          {professor.licenca1 && (
            <span className="bg-info/20 text-info-foreground rounded px-2 py-0.5 text-xs">
              Licença 1
            </span>
          )}
          {professor.licenca2 && (
            <span className="bg-info/20 text-info-foreground rounded px-2 py-0.5 text-xs">
              Licença 2
            </span>
          )}
        </div>
      </div>

      <hr className="border-border" />

      {/* Contato */}
      <div>
        <p className="mb-1 text-[10px] tracking-wider text-muted-foreground uppercase">
          Contato
        </p>
        <p className="text-xs text-muted-foreground">{professor.email}</p>
        <p className="text-xs text-muted-foreground">{professor.telefone}</p>
      </div>

      <hr className="border-border" />

      {/* Carga horária */}
      <div>
        <p className="mb-1 text-[10px] tracking-wider text-muted-foreground uppercase">
          Carga horária
        </p>
        <p className="text-2xl font-medium">{professor.cargaHoraria}h</p>
      </div>

      {/* Insatisfação */}
      <div>
        <p className="mb-1 text-[10px] tracking-wider text-muted-foreground uppercase">
          Insatisfação
        </p>
        <p className="text-2xl font-medium text-orange-500">{insatTotal}</p>
        <div className="mt-2 flex flex-col gap-1">
          {insatDetalhes.map((item) => (
            <div
              key={item.label}
              className="flex justify-between text-xs text-muted-foreground"
            >
              <span>{item.label}</span>
              <span>{item.valor}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Turmas */}
      <div>
        <p className="mb-1 text-[10px] tracking-wider text-muted-foreground uppercase">
          Turmas alocadas
        </p>
        <div className="flex flex-col gap-1">
          {turmasDoProfessor.length > 0 ? (
            turmasDoProfessor.map((t) => (
              <p
                key={t.codigo + t.turma}
                className="border-b border-border pb-1 text-xs text-muted-foreground"
              >
                {t.nome} · T{t.turma}
              </p>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">
              Nenhuma turma alocada
            </p>
          )}
        </div>
      </div>

      {/* Observações */}
      {professor.observacoes && (
        <>
          <hr className="border-border" />
          <div>
            <p className="mb-1 text-[10px] tracking-wider text-muted-foreground uppercase">
              Observações
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {professor.observacoes}
            </p>
          </div>
        </>
      )}
    </aside>
  )
}
