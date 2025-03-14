from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.db.models.withdrawal_model import Withdrawal
from backend.db.models.worker_model import Worker
from backend.db.schemas.withdrawal_schema import WithdrawalCreate

def withdraw_money(db: Session, worker_id: int, amount: float):
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    if worker.available_balance < amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    worker.available_balance -= amount
    db.commit()

    return {"message": "Withdrawal successful", "new_balance": worker.available_balance}

def create_withdrawal(db: Session, withdrawal: WithdrawalCreate):
    worker = db.query(Worker).filter(Worker.id == withdrawal.worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    if worker.available_balance < withdrawal.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    db_withdrawal = Withdrawal(**withdrawal.dict())
    db.add(db_withdrawal)
    
    worker.available_balance -= withdrawal.amount

    db.commit()
    db.refresh(db_withdrawal)
    return db_withdrawal

# Obtener todos los retiros (opcional: filtrar por trabajador)
def get_withdrawals(db: Session, worker_id: int = None):
    query = db.query(Withdrawal)
    if worker_id:
        query = query.filter(Withdrawal.worker_id == worker_id)
    return query.all()