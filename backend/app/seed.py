from alembic import op
from app import models as m

def seed_interests():
    ses = m.Session()
    try:
        ses.query(m.Interests).delete()
        ses.commit()
    except:
        ses.rollback()
    interests = [m.Interests(id = 1, interest = 'Bezpecnost'),
                 m.Interests(id = 2, interest = 'Zelen'),
                 m.Interests(id = 3, interest = 'Transport'),
                 m.Interests(id = 4, interest = 'Social')]
    ses.add_all(interests)
    ses.commit()
    ses.close()
    
def seed_cityParts():
    ses = m.Session()
    try:
        ses.query(m.CityParts).delete()
        ses.commit()
    except:
        ses.rollback()
    cityParts = [m.CityParts(id = 1, cityPart = 'Raca'),
                 m.CityParts(id = 2, cityPart = 'Petrzalka'),
                 m.CityParts(id = 3, cityPart = 'Centrum'),
                 m.CityParts(id = 4, cityPart = 'Dubravka')]
    ses.add_all(cityParts)
    ses.commit()
    ses.close()

if __name__ == '__main__':
    seed_interests()
    seed_cityParts()
    