from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engine

from db.models import worker_model, earning_model, withdrawal_model

Base.metadata.create_all(bind=engine)

from api.routes.earnings_routes import router as earnings_routes
from api.routes.withdraw_routes import router as withdraw_routes
from api.routes.workers_routes import router as workers_routes

app = FastAPI(title="Workers Earnings API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O usa ["*"] para permitir todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

app.include_router(workers_routes, prefix="/api/v1/workers", tags=["Workers"])
app.include_router(earnings_routes, prefix="/api/v1/earnings", tags=["Earnings"])
app.include_router(withdraw_routes, prefix="/api/v1/withdrawals", tags=["Withdrawals"])

@app.get("/")
def home():
    return {"message": "API funcionando 🚀"}
