from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, vehicle, gas_record
from authenticator import authenticator
import os


app = FastAPI()

origins = [
    os.environ.get("CORS_HOST", None),
    "http://localhost:3000",
]

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(vehicle.router)
app.include_router(gas_record.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
