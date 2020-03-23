import falcon
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
        news = [{
                'subject':"Corona je vsade",
                'Description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit elementum, cursus mauris sit amet, tempor sapien. Pellentesque lacinia a elit eu efficitur. Quisque at posuere ex. Praesent posuere enim id est venenatis cursus. Morbi scelerisque lacinia enim et blandit. Donec sed orci pharetra, posuere elit et, finibus dui. Pellentesque malesuada libero ac lectus sodales ullamcorper. Nullam tempus felis non ligula sodales, quis ornare justo luctus. Sed lorem ipsum, faucibus eget nunc non, tempor pretium purus. Donec in nulla est.",
                'Author': "Sebi"
        },
        {
                'subject':"V Bratislave sa stavia metro",
                'Description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit elementum, cursus mauris sit amet, tempor sapien. Pellentesque lacinia a elit eu efficitur. Quisque at posuere ex. Praesent posuere enim id est venenatis cursus. Morbi scelerisque lacinia enim et blandit. Donec sed orci pharetra, posuere elit et, finibus dui. Pellentesque malesuada libero ac lectus sodales ullamcorper. Nullam tempus felis non ligula sodales, quis ornare justo luctus. Sed lorem ipsum, faucibus eget nunc non, tempor pretium purus. Donec in nulla est.",
                'Author': "Martin"
        },
        {
                'subject':"10 novych nakazenych ochorenim COVID-19",
                'Description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit elementum, cursus mauris sit amet, tempor sapien. Pellentesque lacinia a elit eu efficitur. Quisque at posuere ex. Praesent posuere enim id est venenatis cursus. Morbi scelerisque lacinia enim et blandit. Donec sed orci pharetra, posuere elit et, finibus dui. Pellentesque malesuada libero ac lectus sodales ullamcorper. Nullam tempus felis non ligula sodales, quis ornare justo luctus. Sed lorem ipsum, faucibus eget nunc non, tempor pretium purus. Donec in nulla est."
        },
        {
                'subject':"Corona!!!",
                'Description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit elementum, cursus mauris sit amet, tempor sapien. Pellentesque lacinia a elit eu efficitur. Quisque at posuere ex. Praesent posuere enim id est venenatis cursus. Morbi scelerisque lacinia enim et blandit. Donec sed orci pharetra, posuere elit et, finibus dui. Pellentesque malesuada libero ac lectus sodales ullamcorper. Nullam tempus felis non ligula sodales, quis ornare justo luctus. Sed lorem ipsum, faucibus eget nunc non, tempor pretium purus. Donec in nulla est."
        },
        {
                'subject':"Snad to bude dobre",
                'Description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec elit elementum, cursus mauris sit amet, tempor sapien. Pellentesque lacinia a elit eu efficitur. Quisque at posuere ex. Praesent posuere enim id est venenatis cursus. Morbi scelerisque lacinia enim et blandit. Donec sed orci pharetra, posuere elit et, finibus dui. Pellentesque malesuada libero ac lectus sodales ullamcorper. Nullam tempus felis non ligula sodales, quis ornare justo luctus. Sed lorem ipsum, faucibus eget nunc non, tempor pretium purus. Donec in nulla est.",
                'Author': "Premier"
        }]

        resp.media = news


api = falcon.API(middleware=[HandleCORS() ])
api.add_route('/news', NewsCollection())