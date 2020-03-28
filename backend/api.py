from flask import Flask, redirect
from flask_cors import CORS
import requests
import models as m
from random import randint

api = Flask(__name__)
CORS(api)

@api.route('/')
def get_index():
    return redirect("/news",code='302')

@api.route('/news')
def get_news():
    url = ('http://newsapi.org/v2/top-headlines?'
       'country=sk&'
       'apiKey=937002ae68b342789cf3d3515c33a483')
    response = requests.get(url)
    news_json = response.json()

    result_news = []
    for news in news_json['articles']:
            temp = {}
            temp['author'] = news['author']
            temp['title'] = news['title']
            temp['description'] = news['description']
            temp['feedback'] = randint(0,1)
            result_news.append(temp)

    return {'data': result_news}

@api.route('/users')
def get_users():
    ses = m.Session()
    users = ses.query(m.User)

    result = []
    for u in users:
        r = {'id': u.id,
            'name': u.name}
        result.append(r)
    return {'data': result}