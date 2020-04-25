from flask import Flask, redirect, render_template
from flask_cors import CORS
import requests
from app import models as m
from app import schemas
from random import randint
from datetime import datetime
import os

api = Flask("__main__")
api.debug = True
api.root_path = os.path.dirname(os.path.abspath(__file__))
CORS(api)

@api.route('/', defaults={'path': ''})
@api.route('/<path:path>')
def get_index(path):
    return  render_template("index.html", token=path)

@api.route('/api/news')
def get_news():
    url = ('http://newsapi.org/v2/top-headlines?'
       'country=sk&'
       'apiKey=937002ae68b342789cf3d3515c33a483')
    response = requests.get(url)
    news_json = response.json()
    news_schema = schemas.NewsScheme()
    
    result = news_schema.load(news_json['articles'],many=True)
    result_news = news_schema.dump(result,many=True)
    
    return {'data': result_news}

@api.route('/api/users')
def get_users():
    ses = m.Session()
    users = ses.query(m.User)

    result = []
    for u in users:
        r = {'id': u.id,
            'name': u.name}
        result.append(r)
    return {'data': result}

@api.route('/api/age')
def get_age_groups():
    year = datetime.today().year
    r = range(year-150,year)
    years = { 'year': list(reversed([*r])) }
    return {'data': years}

@api.route('/api/interests')
def get_interests():
    ses = m.Session()
    interests = ses.query(m.Interests)

    interests_schema = schemas.InterestsSchema()
    result = interests_schema.dump(interests, many=True)
    
    return {'data': result}

@api.route('/api/cityparts')
def get_cityparts():
    ses = m.Session()
    parts = ses.query(m.CityParts)

    cityParts_schema = schemas.CityPartsSchema()
    result = cityParts_schema.dump(parts, many=True)
    return {'data': result}


if __name__ == "__main__":
    api.run(host='0.0.0.0')