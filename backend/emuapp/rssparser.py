import feedparser

def parse_rss(feed_link):
    news = feedparser.parse(feed_link)
    return news['entries']

if __name__ == "__main__":
    test = parse_rss('https://www.banm.sk/rss/')
    for t in test:
        print(t)