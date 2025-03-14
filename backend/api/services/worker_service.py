from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from backend.db.models.earning_model import Earning
from backend.db.models.withdrawal_model import Withdrawal
from backend.db.models.worker_model import Worker
from backend.db.schemas.worker_schema import WorkerCreate

def create_worker(db: Session, worker_data: WorkerCreate):
    existing_worker = db.query(Worker).filter(Worker.phone_number == worker_data.phone_number).first()
    if existing_worker:
        raise HTTPException(status_code=400, detail="El número de teléfono ya está registrado.")

    new_worker = Worker(**worker_data.dict())
    db.add(new_worker)
    
    try:
        db.commit()
        db.refresh(new_worker)
        return new_worker
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al guardar el trabajador. Intenta de nuevo.")

def edit_worker(db: Session, worker_id: int, worker_data: WorkerCreate):
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Trabajador no encontrado.")
    
    worker.first_name = worker_data.first_name
    worker.last_name = worker_data.last_name
    worker.phone_number = worker_data.phone_number

    db.commit()
    db.refresh(worker)
    return worker

def delete_worker(db: Session, worker_id: int):
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    # 🔥 Eliminar registros dependientes antes de eliminar el worker
    db.query(Earning).filter(Earning.worker_id == worker_id).delete()
    db.query(Withdrawal).filter(Withdrawal.worker_id == worker_id).delete()

    db.delete(worker)
    db.commit()
    
    return {"message": "Worker deleted successfully"}
def get_workers(db: Session):
    return db.query(Worker).all()

def get_worker(db: Session, worker_id: int):
    return db.query(Worker).filter(Worker.id == worker_id).first()
