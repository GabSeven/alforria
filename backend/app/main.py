from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from processors.tsv_processor import tsv_para_estruturado
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

@app.post("/professores")
async def upload_tsv(arquivo: UploadFile = File(...)):  # ← AQUI ESTÁ O ERRO!
    
    print("✅ 0 - Função chamada!")
    if not arquivo.filename.endswith('.tsv'):
        raise HTTPException(
            status_code=400,
            detail="Apenas arquivos TSV são aceitos"
        )
    
    print("✅ 1 - Arquivo validado")
    conteudo = await arquivo.read()
    
    print("✅ 2 - Conteúdo lido")
    conteudo_texto = conteudo.decode('utf-8')
    print("✅ 3 - Decodificado")
    
    dados = tsv_para_estruturado(conteudo_texto)
    print("✅ 4 - Processamento completo")
    
    return dados
