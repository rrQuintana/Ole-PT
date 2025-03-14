from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.schemas.withdrawal_schema import Withdrawal, WithdrawalCreate
from backend.api.services.withdrawal_service import create_withdrawal, get_withdrawals
from typing import List, Optional

router = APIRouter()

@router.post("/", response_model=Withdrawal)
def withdraw_money(withdrawal: WithdrawalCreate, db: Session = Depends(get_db)):
    return create_withdrawal(db, withdrawal)

@router.get("/", response_model=List[Withdrawal])
def list_withdrawals(worker_id: Optional[int] = None, db: Session = Depends(get_db)):
    return get_withdrawals(db, worker_id)

