import { HORARIOS, PERIODOS, DIAS } from "@/config/timetable"
import type { Turma } from "@/types"

interface TimetableProps {
  turma: Turma
}

export function Timetable({ turma }: TimetableProps) {
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
                  <td className="bg-muted pr-2 text-right text-muted-foreground">
                    {horario} · {HORARIOS[horario]}
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
