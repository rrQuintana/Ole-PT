from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.db.schemas.earning_schema import EarningCreate, EarningResponse, WorkerInfo
from datetime import date
from typing import Optional
from backend.db.models.earning_model import Earning
from backend.db.models.worker_model import Worker

def create_earning(db: Session, earning: EarningCreate):
    db_earning = Earning(**earning.dict())
    db.add(db_earning)
    
    worker = db.query(Worker).filter(Worker.id == earning.worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Trabajador no encontrado.")

    worker.available_balance += earning.earning_total

    db.commit()
    db.refresh(db_earning)
    return db_earning

def get_earnings(db: Session, worker_id: Optional[int] = None, start_date: Optional[date] = None, end_date: Optional[date] = None):
    query = db.query(Earning, Worker.id, Worker.first_name, Worker.last_name, Worker.available_balance)
    
    query = query.join(Worker, Worker.id == Earning.worker_id)

    if worker_id:
        query = query.filter(Earning.worker_id == worker_id)

    if start_date and end_date:
        query = query.filter(Earning.date.between(start_date, end_date))

    results = query.all()

    earnings_list = [
        EarningResponse(
            earning_total=earning.earning_total,
            date=earning.date,
            worker=WorkerInfo(
                id=worker_id,
                first_name=first_name,
                last_name=last_name,
                available_balance=available_balance
            )
        )
        for earning, worker_id, first_name, last_name, available_balance in results
    ]

    return earnings_list

def get_total_earnings(db: Session, start_date: date, end_date: date, worker_id: Optional[int] = None):
    query = db.query(Earning)
    if worker_id:
        query = query.filter(Earning.worker_id == worker_id)
    query = query.filter(Earning.date.between(start_date, end_date))
    return sum(earning.earning_total for earning in query.all())
