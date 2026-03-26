export const HORARIOS: Record<number, string> = {
  1: "07h30",
  2: "08h20",
  3: "09h10",
  4: "10h00",
  5: "10h50",
  6: "13h00",
  7: "13h50",
  8: "14h40",
  9: "15h30",
  10: "16h20",
  11: "17h10",
  12: "18h00",
  13: "18h50",
  14: "19h40",
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
