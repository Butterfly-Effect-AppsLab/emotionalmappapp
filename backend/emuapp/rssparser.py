import feedparser

NewsFeed = feedparser.parse("https://bratislava.sk/rss?projection=529")
entry = NewsFeed.entries[1]

print(NewsFeed.entries)
