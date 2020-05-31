from alembic import op
import json
import requests
import os
from emuapp import decorators as dec
from random import randint
from emuapp import models as m
from emuapp import schemas

cur_path = os.path.dirname(__file__)

@dec.init_db
def seed_interests(ses):
    try:
        ses.query(m.Interest).delete()
        ses.commit()
    except:
        ses.rollback()
    interests = [m.Interest(interest='Doprava'),
                 m.Interest(interest='Životné prostredie'),
                 m.Interest(interest='Energetika a odpady'),
                 m.Interest(interest='Socialne služby'),
                 m.Interest(interest='Kultúra'),
                 m.Interest(interest='Vzdelávanie a šport')]
    ses.add_all(interests)
    ses.commit()

@dec.init_db
def seed_news(ses):
    try:
        ses.query(m.News).delete()
        ses.commit()
    except:
        ses.rollback()
    news = []
    url = ('http://newsapi.org/v2/top-headlines?'
       'country=sk&'
       'apiKey=937002ae68b342789cf3d3515c33a483')
    response = requests.get(url)
    news_json = response.json()
    news_schema = schemas.NewsScheme()

    news = news_schema.load(news_json['articles'], many=True)
    ses.add_all(news)

    interests = ses.query(m.Interest)

    for n in news:
        for i in range(0,randint(1,4)):
            n.interests.append(interests[randint(0,4)])
    ses.commit()

@dec.init_db
def seed_streets(ses):
    try:
        ses.query(m.Street).delete()
        ses.commit()
    except:
        ses.rollback()
    streets = []
    with open('/opt/app/backend/importdata/streets.jsonc') as json_file:
        data = json.load(json_file)
        for p in data['data']:
            for s in p['sub']:
                for st in s['streets']:
                    streets.append(m.Street(street = st, sub_part = s['sub-part'], part = p['part']))
    ses.add_all(streets)
    ses.commit()

@dec.init_db
def seed_surveys(ses):
    try:
        ses.query(m.Survey).delete()
        ses.commit()
    except:
        ses.rollback()
    with open('/opt/app/backend/importdata/surveysTemp.jsonc') as json_file:
        data = json.load(json_file)
        for s in data:
            response = requests.post('http://localhost:5000/api/createSurvey', headers = {'ContentType':'application/json'}, json=s)
            #print(response.content)


if __name__ == '__main__':
    seed_interests()
    seed_streets()
    seed_news()
    seed_surveys()
