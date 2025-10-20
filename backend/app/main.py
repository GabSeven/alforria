from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/teste")
async def root():
    return {"message": "Hello Worldaaaaaaaa",
            "code": 201}

@app.post("/teste")
async def root():
    return {"message": "Worldaaaaaaaa",
            "code": 201}

# transformar todas informacoes em json :)