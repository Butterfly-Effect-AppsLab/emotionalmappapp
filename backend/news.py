import falcon
import requests
import models as m
from random import randint
from falcon.http_status import HTTPStatus


class HandleCORS(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Methods', '*')
        resp.set_header('Access-Control-Allow-Headers', '*')
        resp.set_header('Access-Control-Max-Age', 1728000)  # 20 days
        if req.method == 'OPTIONS':
            raise HTTPStatus(falcon.HTTP_200, body='\n')

class NewsCollection:

    def on_get(self, req, resp):
        """Handles GET requests"""
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

        resp.media = result_news

class UserCollection:

    def on_get(self, req, resp):
        """Handles GET requests"""
        ses = m.Session()
        users = ses.query(m.User)

        result = []
        for u in users:
            r = {'name': u.name}
            result.append(r)
        resp.media = result

api = falcon.API(middleware=[HandleCORS() ])
api.add_route('/news', NewsCollection())
api.add_route('/users', UserCollection())