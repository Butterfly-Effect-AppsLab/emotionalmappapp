import feedparser

def parse_rss(feed_link):
    news = feedparser.parse(feed_link)
    return news
