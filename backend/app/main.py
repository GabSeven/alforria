from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from processors.tsv_processor import tsv_para_estruturado
import processors.tsv_processor
import processors.grupos
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite tudo temporariamente
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test-cors")
async def test_cors_post():
    return {"message": "CORS POST funcionando!"}

@app.get("/")
async def root():
    return {"message": "Hello Wsorld"}

@app.get("/teste")
async def root():
    return {"message": "Hello Worldaaaaaaaa",
            "code": 201}

@app.post("/teste")
async def root():
    return {"message": "Worldaaaaaaaa",
            "code": 201}

# transformar todas informacoes em json :)
@app.get("/professores")
async def professores():
    return {"aaaaaaa": "aaa"}

@app.post("/upload")
async def upload(
    professores: UploadFile = File(..., description= "Arquivo TSV de professores"), 
    grupos: UploadFile = File(..., description="Arquivo TXT de grupos")):
    
    if not professores.filename.endswith('.tsv'):
        raise HTTPException(
            status_code=400,
            detail="Apenas arquivos TSV são aceitos"
        )
    
    if not grupos.filename.endswith('.txt'):
        raise HTTPException(
            status_code=400,
            detail="Apenas arquivos TXT são aceitos"
        )
    print("EEEEEEEEEEEEEE")
    
    conteudoGrupos = await grupos.read()
    conteudoProf = await professores.read()

    dadosGrupos = processors.grupos.processar_txt(conteudoGrupos.decode('utf-8'))
    dadosProf = processors.tsv_processor.tsv_para_estruturado(conteudoProf.decode('utf-8'))
    

    print("✅  - Processamento completo")
    
    return { "professores" : dadosProf, "grupos" : dadosGrupos }
