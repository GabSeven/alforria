import io

def processar_txt(conteudo: str) -> dict:
    grupos = {}
    f = io.StringIO(conteudo)

    for linha in f:
        linha = linha.strip()
        if not linha:
            continue  # pula linhas vazias

        elementos = linha.split()  # ou .split('\t') se for TSV
        codigo_grupo = elementos[1]
        codigos_disciplinas = elementos[2:]

        # adiciona as disciplinas no grupo
        if codigo_grupo not in grupos:
            grupos[codigo_grupo] = set()

        grupos[codigo_grupo].update(codigos_disciplinas)

    return grupos


def abrir_arquivo():
    with open("./grupos.txt", encoding="utf-8") as f:
        conteudo = f.read()

    resultado = processar_txt(conteudo)
    print(resultado)

