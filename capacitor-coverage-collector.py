import json
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://192.168.219.107:5173",
    "http://192.168.219.107:5174",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/coverage/{name}')
def save_coverage(name: str, data = Body()):
    with open('./.nyc_output/'+name, 'w', encoding='utf-8') as f:
        json.dump(data, f)
