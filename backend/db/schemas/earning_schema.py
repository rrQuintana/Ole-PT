from pydantic import BaseModel
from datetime import date


class EarningBase(BaseModel):
    earning_total: float
    date: date

class EarningCreate(EarningBase):
    worker_id: int

class Earning(EarningBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True


class WorkerInfo(BaseModel):
    id: int
    first_name: str
    last_name: str
    available_balance: float

class EarningResponse(BaseModel):
    earning_total: float
    date: date
    worker: WorkerInfo

    class Config:
        orm_mode = True