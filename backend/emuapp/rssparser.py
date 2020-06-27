import feedparser, datetime
from emuapp import models as m
from emuapp import schemas
from emuapp import decorators as dec


def parse_rss(rss_address, rss_feed_id):
    news = feedparser.parse(rss_address)
    news_schema = schemas.NewsScheme()
    result = []
    for n in news['entries']:
        print(n)
        day =  n.published_parsed[2] if len(str(n.published_parsed[2])) > 1 else f"0{n.published_parsed[2]}"
        month = n.published_parsed[1] if len(str(n.published_parsed[1])) > 1 else f"0{n.published_parsed[1]}"
        published_date = f"{n.published_parsed[0]}-{month}-{day} {n.published_parsed[3]}:{n.published_parsed[4]}"
        temp = {
            'title': n.title,
            'description': n.title,
            'link': n.link,
            'image':  n['media_content'][0]['url'] if 'media_content' in n and 'url' in n['media_content'][0] else "",
            'pub_date': str(datetime.datetime.strptime(published_date, "%Y-%m-%d %H:%M")),
            'rss_feed_id': rss_feed_id
        }
        result.append(temp)
    return news_schema.load(result, many=True)

def seed_rss():
    ses = m.Session()
    feeds_schema = schemas.RssFeedSchema()

    temp_feeds = ses.query(m.RssFeed).all()

    for feed in temp_feeds:
        for address in feed.rss_address:
            news = parse_rss(address.address, feed.id )
            for n in news:
                try:
                    ses.add(n)
                    ses.commit()
                    print("new")
                except:
                    print("already in db")
                    ses.rollback()
    ses.close()

if __name__ == "__main__":
    seed_rss()