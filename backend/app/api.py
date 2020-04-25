from flask import Flask, redirect, render_template
from flask_cors import CORS
import requests
from app import models as m
from app import schemas
from random import randint
import os

api = Flask("__main__")
#api.debug = True
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

@api.route('/api/agegroups')
def get_age_groups():
    groups = { 'ageGroups': ['18-25','26-35','36-45','46-55','55-70','71+'] }
    return {'data': groups}

@api.route('/api/interests')
def get_interests():
    interests = { 'interests': ['Bezpecnost','Zelen','Zdravie','Cestovanie','Zabava','Oddych'] }
    return {'data': interests}

@api.route('/api/cityparts')
def get_cityparts():
    parts = { 'cityParts': ['Centrum','Raca','Dubravka','Petrzalka','Karlovka','Nove Mesto'] }
    return {'data': parts}


if __name__ == "__main__":
    api.run(host='0.0.0.0')