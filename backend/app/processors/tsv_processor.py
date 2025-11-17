import io

import pandas as pd

# from pydantic import BaseModel

# class Turma(BaseModel):
#     codigo_disciplina: str
#     nome_disciplina: str
#     numero_turma: int
#     curso: str


# class Professor(BaseModel):
#     matricula: str
#     nome: str
#     turmas: list[Turma]


# essa função deveria funcionar para qualquer tipo de tsv
def tsv_para_estruturado(arquivo: str) -> dict:
    df = pd.read_csv(io.StringIO(arquivo), sep="\t", dtype=str)

    df["curso"] = df["curso"].fillna("")

    colunas_para_string = ["matricula", "codigo_turma", "turma"]
    for coluna in colunas_para_string:
        df[coluna] = df[coluna].astype(str)
        df[coluna] = df[coluna].str.replace(r"\.0$", "", regex=True)

    df["carga_horaria"] = df["carga_horaria"].astype(int)
    professores = {}
    for _, linha in df.iterrows():
        matricula = linha["matricula"]
        if matricula not in professores:
            professores[matricula] = {"nome": linha["nome_professor"], "turmas": []}

        # turma_data = Turma(
        #     codigo_disciplina=linha["codigo_turma"],
        #     nome_disciplina= linha["nome_disciplina"],
        #     numero_turma= linha["turma"],
        #     curso= linha["curso"]
        # )

        professores[matricula]["turmas"].append(
            {
                "cod_disc": linha["codigo_turma"],
                "disciplina": linha["nome_disciplina"],
                "turma": linha["turma"],
                "curso": linha["curso"],
                "carga_horaria": linha["carga_horaria"],
            }
        )

    return professores
