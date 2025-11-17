import json


def salvar_dados_processados(dados: dict):
    with open("../../dados.json", "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)


def carregar_dados():
    with open("../../dados.json", "r", encoding="utf-8") as f:
        return json.load(f)
