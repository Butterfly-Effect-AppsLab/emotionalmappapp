from sqlalchemy import(
    Column,
    Table,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

engine = create_engine('postgresql://postgres:postgres@db/emu')
Session = sessionmaker(bind=engine)

user_has_interests_table = Table('user_has_interests', Base.metadata,
                                 Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
                                 Column('interest_id', Integer, ForeignKey('interests.id'), primary_key=True))

news_has_interests_table = Table('news_has_interests', Base.metadata,
                                 Column('news_id', Integer, ForeignKey('news.id'), primary_key=True),
                                 Column('interest_id', Integer, ForeignKey('interests.id'), primary_key=True))


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    sex = Column(String, nullable=False)
    interests = relationship('Interest', secondary=user_has_interests_table)
    residence_location = Column(String)
    work_location = Column(String)
    birthyear = Column(Integer, nullable=False)

class Interest(Base):
    __tablename__ = 'interests'

    id = Column(Integer, primary_key=True)
    interest = Column(String, nullable=False)

class Street(Base):
    __tablename__ = 'streets'

    id = Column(Integer, primary_key=True)
    part = Column(String)
    sub_part = Column(String)
    street = Column(String)

class News(Base):
    __tablename__ = 'news'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    author = Column(String)
    feedback = Column(Boolean)
    interests = relationship('Interest', secondary=user_has_interests_table)