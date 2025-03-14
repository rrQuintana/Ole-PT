from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.schemas.worker_schema import Worker, WorkerCreate
from backend.api.services.worker_service import create_worker, get_workers, delete_worker, edit_worker, get_worker
from typing import List

router = APIRouter()

@router.post("/", response_model=Worker)
def add_worker(worker: WorkerCreate, db: Session = Depends(get_db)):
    return create_worker(db, worker)

@router.get("/", response_model=List[Worker])
def list_workers(db: Session = Depends(get_db)):
    return get_workers(db)

@router.get("/{worker_id}")
def get_worker_by_id(worker_id: int, db: Session = Depends(get_db)):
    return get_worker(db, worker_id)

@router.put("/{worker_id}")
def update_worker(worker_id: int, worker: WorkerCreate, db: Session = Depends(get_db)):
    return edit_worker(db, worker_id, worker)

@router.delete("/{worker_id}")
def remove_worker(worker_id: int, db: Session = Depends(get_db)):
    return delete_worker(db, worker_id)