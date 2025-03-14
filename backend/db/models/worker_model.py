from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from backend.db.database import Base
from backend.db.models.earning_model import Earning
from backend.db.models.withdrawal_model import Withdrawal

class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    available_balance = Column(Float, default=0.0)

    earnings = relationship("Earning", back_populates="worker", cascade="all, delete")
    withdrawals = relationship("Withdrawal", back_populates="worker", cascade="all, delete")
