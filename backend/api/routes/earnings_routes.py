from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from api.services.earning_service import create_earning, get_earnings
from db.schemas.earning_schema import Earning, EarningCreate, EarningResponse
from typing import List, Optional
from datetime import date

router = APIRouter()

@router.post("/", response_model=Earning)
def add_earning(earning: EarningCreate, db: Session = Depends(get_db)):
    return create_earning(db, earning)

@router.get("/", response_model=List[EarningResponse])
def get_earnings_list(worker_id: Optional[int] = None, start_date: Optional[date] = None, end_date: Optional[date] = None, db: Session = Depends(get_db)):
    return get_earnings(db, worker_id, start_date, end_date)
