export const HORARIOS: Record<number, string> = {
  1: "07h45",
  2: "08h35",
  3: "09h40",
  4: "10h30",
  5: "11h20",
  6: "13h30",
  7: "14h20",
  8: "15h20",
  9: "16h10",
  10: "17h00",
  11: "17h50",
  12: "18h00",
  13: "19h30",
  14: "20h20",
  15: "20h30",
  16: "21h20",
}

export const PERIODOS = {
  manha: { label: "Manhã", horarios: [1, 2, 3, 4, 5] },
  tarde: { label: "Tarde", horarios: [6, 7, 8, 9, 10] },
  intermediario: { label: "Intermediário", horarios: [11, 12] },
  noite: { label: "Noite", horarios: [13, 14, 15, 16] },
}

export const DIAS: Record<number, string> = {
  2: "Seg",
  3: "Ter",
  4: "Qua",
  5: "Qui",
  6: "Sex",
  7: "Sáb",
}
