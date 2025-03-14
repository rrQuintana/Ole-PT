
from typing import List
from pydantic import BaseModel

from backend.db.schemas.earning_schema import Earning
from backend.db.schemas.withdrawal_schema import Withdrawal

class WorkerBase(BaseModel):
    first_name: str
    last_name: str
    phone_number: str

class WorkerCreate(WorkerBase):
    pass

class Worker(WorkerBase):
    id: int
    available_balance: float
    earnings: List["Earning"] = []
    withdrawals: List["Withdrawal"] = []

    class Config:
        from_attributes = True
