import os

import alforria
import processors.grupos
import processors.save_load
import processors.tsv_processor

# from processors.tsv_processor import tsv_para_estruturado
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# alforria.start() # passa os caminhos e configuracoes iniciais
# alforria.set_config_path("./alforriaData/config")
alforria.alforria._PATHS_PATH = "../../alforriaData/config/paths.cnf"
alforria.alforria._ALFCFG_PATH = "../../alforriaData/config/alforria.cnf"
alforria.alforria_CONST_PATH = "../../alforriaData/config/constantes.cnf"
# carrega os objetos
# from alforria import professores, grupos, turmas, pre_atribuidas,s

alforria.alforria._load_()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite tudo temporariamente
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/dados")
async def loadDados():
    # if not os.path.exists("../../dados.json"):
    #     raise HTTPException(status_code=400, detail="É preciso upar dados")
    print(alforria.alforria.grupos)
    return alforria.alforria.grupos


# @app.post("/upload")
# async def upload(
#     professores: UploadFile = File(..., description="Arquivo TSV de professores"),
#     grupos: UploadFile = File(..., description="Arquivo TXT de grupos"),
# ):
#     if not professores.filename.endswith(".tsv"):
#         raise HTTPException(status_code=400, detail="Apenas arquivos TSV são aceitos")

#     if not grupos.filename.endswith(".txt"):
#         raise HTTPException(status_code=400, detail="Apenas arquivos TXT são aceitos")
#     print("EEEEEEEEEEEEEE")

#     conteudoGrupos = await grupos.read()
#     conteudoProf = await professores.read()

#     dadosGrupos = processors.grupos.processar_txt(conteudoGrupos.decode("utf-8"))
#     dadosProf = processors.tsv_processor.tsv_para_estruturado(
#         conteudoProf.decode("utf-8")
#     )

#     print("✅  - Processamento completo")

#     dados = {"professores": dadosProf, "grupos": dadosGrupos}

#     processors.save_load.salvar_dados_processados(dados)

#     return {"status": "sucess"}


@app.post("/upload")
async def upload():
    save()  # coloca os arquivos na pasta de arquivos
    alforria.alforria._load_()


def save():
    print("arquivos salvos")
