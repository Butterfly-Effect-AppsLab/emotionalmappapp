import falcon
import requests
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
        import requests
        url = ('http://newsapi.org/v2/top-headlines?'
       'country=sk&'
       'apiKey=937002ae68b342789cf3d3515c33a483')
        response = requests.get(url)
        newsJson = response.json()

        result_news = []
        for news in newsJson['articles']:
                temp = {}
                temp['author'] = news['author']
                temp['title'] = news['title']
                temp['description'] = news['description']
                temp['feedback'] = randint(0,1)
                result_news.append(temp)

        resp.media = result_news


api = falcon.API(middleware=[HandleCORS() ])
api.add_route('/news', NewsCollection())