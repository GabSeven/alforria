import os

import processors.grupos
import processors.save_load
import processors.tsv_processor

# from processors.tsv_processor import tsv_para_estruturado
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite tudo temporariamente
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/dados")
async def loadDados():
    if not os.path.exists("../../dados.json"):
        raise HTTPException(status_code=400, detail="É preciso upar dados")

    return processors.save_load.carregar_dados()


@app.post("/upload")
async def upload(
    professores: UploadFile = File(..., description="Arquivo TSV de professores"),
    grupos: UploadFile = File(..., description="Arquivo TXT de grupos"),
):
    if not professores.filename.endswith(".tsv"):
        raise HTTPException(status_code=400, detail="Apenas arquivos TSV são aceitos")

    if not grupos.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Apenas arquivos TXT são aceitos")
    print("EEEEEEEEEEEEEE")

    conteudoGrupos = await grupos.read()
    conteudoProf = await professores.read()

    dadosGrupos = processors.grupos.processar_txt(conteudoGrupos.decode("utf-8"))
    dadosProf = processors.tsv_processor.tsv_para_estruturado(
        conteudoProf.decode("utf-8")
    )

    print("✅  - Processamento completo")

    dados = {"professores": dadosProf, "grupos": dadosGrupos}

    processors.save_load.salvar_dados_processados(dados)

    return {"status": "sucess"}
