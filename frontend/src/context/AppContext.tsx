import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

import type { Turma, Professor } from "@/types"

const API_URL = "http://127.0.0.1:8000"

type AppContextType = {
  turmas: Turma[] | null
  setTurmas: React.Dispatch<React.SetStateAction<Turma[] | null>>
  professores: Professor[] | null
  setProfessores: React.Dispatch<React.SetStateAction<Professor[] | null>>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [turmas, setTurmas] = useState<Turma[] | null>(null)
  const [professores, setProfessores] = useState<Professor[] | null>(null)

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/turmas`).then((r) => r.json()),
      fetch(`${API_URL}/professores`).then((r) => r.json()),
    ]).then(([turmas, professores]) => {
      turmas = turmas.map((t: Turma) => ({
        ...t,
        id: `${t.codigo}-${t.turma}-${t.semestralidade}`,
      }))
      professores = professores.map((p: any) => ({
        ...p,
        turmas: p.turmasALecionar,
      }))
      setTurmas(turmas)
      setProfessores(professores)
    })
  }, [])

  return (
    <AppContext.Provider
      value={{ turmas, setTurmas, professores, setProfessores }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider")
  return ctx
}
