from alembic import op
import json
import requests
import os
from app import models as m
from app import schemas

cur_path = os.path.dirname(__file__)

def seed_interests():
    ses = m.Session()
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
    ses.close()


def seed_news():
    ses = m.Session()
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
    ses.commit()
    ses.close()

def seed_streets():
    ses = m.Session()
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
    ses.close()

if __name__ == '__main__':
    seed_interests()
    seed_streets()
    seed_news()
