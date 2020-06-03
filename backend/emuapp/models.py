from sqlalchemy import(
    Column,
    Table,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

engine = create_engine('postgresql://postgres:postgres@db/emu')
Session = sessionmaker(bind=engine)

user_has_interests_table = Table('user_has_interests', Base.metadata,
                                 Column('user_id', String(32), ForeignKey('users.id'), primary_key=True),
                                 Column('interest_id', Integer, ForeignKey('interests.id'), primary_key=True))

news_has_interests_table = Table('news_has_interests', Base.metadata,
                                 Column('news_id', Integer, ForeignKey('news.id'), primary_key=True),
                                 Column('interest_id', Integer, ForeignKey('interests.id'), primary_key=True))

survey_has_interests_table = Table('survey_has_interests', Base.metadata,
                                 Column('survey_id', Integer, ForeignKey('surveys.id'), primary_key=True),
                                 Column('interest_id', Integer, ForeignKey('interests.id'), primary_key=True))

survey_has_residence_region_table = Table('survey_has_residence_region', Base.metadata,
                                 Column('survey_id', Integer, ForeignKey('surveys.id'), primary_key=True),
                                 Column('street_id', Integer, ForeignKey('streets.id'), primary_key=True))

survey_has_work_region_table = Table('survey_has_work_region', Base.metadata,
                                 Column('survey_id', Integer, ForeignKey('surveys.id'), primary_key=True),
                                 Column('street_id', Integer, ForeignKey('streets.id'), primary_key=True))


class User(Base):
    __tablename__ = 'users'

    id = Column(String(32), default=lambda: uuid.uuid4().hex, primary_key=True)
    social_id = Column(String)
    sex = Column(String)
    interests = relationship('Interest', secondary=user_has_interests_table)
    residence_location_id = Column(Integer, ForeignKey('streets.id'))
    work_location_id = Column(Integer, ForeignKey('streets.id'))
    residence_location = relationship('Street', foreign_keys=[residence_location_id])
    work_location = relationship('Street', foreign_keys=[work_location_id])
    survey_records = relationship('SurveyRecord')
    birthyear = Column(Integer)
    created = Column(DateTime, default= datetime.datetime.utcnow())

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
    interests = relationship('Interest', secondary=news_has_interests_table)

class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True)
    survey_record_id = Column(Integer, ForeignKey('survey_records.id'))
    question_id = Column(Integer, ForeignKey('questions.id'))
    answer = Column(String)

class SurveyRecord(Base):
    __tablename__ = 'survey_records'

    id = Column(Integer, primary_key=True)
    survey_id = Column(Integer, ForeignKey('surveys.id'))
    user_id = Column(String(32), ForeignKey('users.id'))
    users = relationship('User', foreign_keys=[user_id])
    surveys = relationship('Survey', foreign_keys=[survey_id])
    created = Column(DateTime, default= datetime.datetime.utcnow())
    answers = relationship('Answer')

class Question(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    survey_id = Column(Integer, ForeignKey('surveys.id'))
    surveys = relationship('Survey', back_populates='questions')
    question = Column(String)
    type = Column(String)
    options = relationship('QuestionOption', back_populates='questions')

class QuestionOption(Base):
    __tablename__ = 'question_options'

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    questions = relationship('Question', back_populates='options')
    option = Column(String)

class Survey(Base):
    __tablename__ = 'surveys'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    estimated_time = Column(Integer)
    age_group_bottom = Column(Integer)
    age_group_top = Column(Integer)
    interests = relationship('Interest', secondary=survey_has_interests_table)
    residence_regions = relationship('Street', secondary=survey_has_residence_region_table)
    work_regions = relationship('Street', secondary=survey_has_work_region_table)
    questions = relationship('Question', back_populates='surveys')
    survey_records = relationship('SurveyRecord', back_populates='surveys')
    survey_type = Column(String)
    active_to = Column(DateTime)
    created = Column(DateTime, default= datetime.datetime.utcnow())