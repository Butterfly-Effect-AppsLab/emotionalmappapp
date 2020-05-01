from alembic import op
import json
import os
from app import models as m

cur_path = os.path.dirname(__file__)

def seed_interests():
    ses = m.Session()
    try:
        ses.query(m.Interests).delete()
        ses.commit()
    except:
        ses.rollback()
    interests = [m.Interests(interest='Bezpecnost'),
                 m.Interests(interest='Zelen'),
                 m.Interests(interest='Transport'),
                 m.Interests(interest='Social')]
    ses.add_all(interests)
    ses.commit()
    ses.close()


def seed_streets():
    ses = m.Session()
    try:
        ses.query(m.Street).delete()
        ses.commit()
    except:
        ses.rollback()
    streets = []
    with open('/opt/app/backend/importdata/streets.jsonc') as json_file:
        data = json.load(json_file)
        for p in data['data']:
            for s in p['sub']:
                for st in s['streets']:
                    streets.append(m.Street(street = st, sub_part = s['sub-part'], part = p['part']))
    ses.add_all(streets)
    ses.commit()
    ses.close()


if __name__ == '__main__':
    seed_interests()
    seed_streets()
