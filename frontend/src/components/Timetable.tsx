import { HORARIOS, PERIODOS, DIAS } from "@/config/timetable"
import type { Turma, Professor } from "@/types"
import { useApp } from "@/context/AppContext"
import { Link } from "react-router"

interface TurmaTimetableProps {
  turma: Turma
}

export function TurmaTimetable({ turma }: TurmaTimetableProps) {
  const dias = Object.keys(DIAS).map(Number)

  const temAula = (dia: number, horario: number) =>
    turma.horarios.some((h) => h.dia === dia && h.horario === horario)

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-xs">
        <thead>
          <tr>
            <th className="w-20" />
            {dias.map((dia) => (
              <th
                key={dia}
                className="pb-2 text-center font-medium text-muted-foreground"
              >
                {DIAS[dia]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(PERIODOS).map((periodo) => (
            <>
              <tr key={periodo.label}>
                <td
                  colSpan={7}
                  className="bg-muted py-1 pl-2 text-left text-xs font-medium text-muted-foreground"
                >
                  {periodo.label}
                </td>
              </tr>
              {periodo.horarios.map((horario) => (
                <tr key={horario}>
                  <td className="bg-muted pr-2 text-center text-muted-foreground">
                    {horario}
                  </td>
                  {dias.map((dia) => (
                    <td
                      key={dia}
                      className={`h-9 border border-border text-center ${
                        temAula(dia, horario)
                          ? "bg-purple-100 dark:bg-purple-900"
                          : ""
                      }`}
                    />
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ProfessorTimetableProps {
  professor: Professor
  semestre: 1 | 2
}

export function ProfessorTimetable({
  professor,
  semestre,
}: ProfessorTimetableProps) {
  const dias = Object.keys(DIAS).map(Number)
  const { turmas } = useApp()

  const turmasDoProfessor =
    turmas?.filter(
      (t) => professor.turmas.includes(t.id) && t.semestralidade == semestre
    ) ?? []

  type AulasHorario = Record<string, string[]>
  type AulasDia = Record<string, AulasHorario>

  const qualAula: AulasDia = turmasDoProfessor.reduce((acc, turma) => {
    turma.horarios.forEach(({ dia, horario }) => {
      if (!acc[dia]) acc[dia] = {}
      if (!acc[dia][horario]) acc[dia][horario] = []
      acc[dia][horario].push(turma.id)
    })
    return acc
  }, {} as AulasDia)

  // const qualAula: AulaDiaHorario = professor.turmas?.reduce(
  //   (acc, turma, indiceTurma) => {
  //     turma.horarios?.forEach(({ dia, horario }) => {
  //       acc[`${dia}-${horario}`] = indiceTurma
  //     })
  //     return acc
  //   },
  //   {} as AulaDiaHorario
  // )

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-xs">
        <thead>
          <tr>
            <th className="w-20" />
            {dias.map((dia) => (
              <th
                key={dia}
                className="pb-2 text-center font-medium text-muted-foreground"
              >
                {DIAS[dia]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(PERIODOS).map((periodo) => (
            <>
              <tr key={periodo.label}>
                <td
                  colSpan={Object.entries(DIAS).length + 1}
                  className="bg-muted py-1 pl-2 text-left text-xs font-medium text-muted-foreground"
                >
                  {periodo.label}
                </td>
              </tr>
              {periodo.horarios.map((horario) => (
                <tr key={horario}>
                  <td className="bg-muted pr-2 text-center text-muted-foreground">
                    {horario}
                    {/*· {HORARIOS[horario]}*/}
                  </td>
                  {dias.map((dia) => (
                    <td
                      key={dia}
                      className={`h-9 border border-border text-center`}
                    >
                      <div className="flex flex-col gap-0.5">
                        {qualAula?.[dia]?.[horario]?.map((id) => (
                          <Link
                            to={`/turmas/${id}`}
                            key={id}
                            className="text-xs"
                          >
                            {id}
                          </Link>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
