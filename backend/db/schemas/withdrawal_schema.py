from pydantic import BaseModel
from datetime import date

class WithdrawalBase(BaseModel):  # 🔥 Nuevo esquema
    amount: float
    date: date

class WithdrawalCreate(WithdrawalBase):
    worker_id: int

class Withdrawal(WithdrawalBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True