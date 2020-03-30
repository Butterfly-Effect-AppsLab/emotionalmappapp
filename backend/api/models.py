from sqlalchemy import(
    Column,
    Integer,
    String
)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

engine = create_engine('sqlite:///database/emu.db')
Session = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    uuid = Column(String, nullable=False)
    sex = Column(String, nullable=False)
    region = Column(String)
    age_group_id = Column(Integer, nullable=False)

class Interests(Base):
    __tablename__ = 'interests'

    id = Column(Integer, primary_key=True)
    interest = Column(String, nullable=False)