from alembic import op
from app import models as m


ses = m.Session()
try:
    ses.query(m.Interests).delete()
    ses.commit()
except:
    ses.rollback()
    
try:
    ses.query(m.CityParts).delete()
    ses.commit()
except:
    ses.rollback()

ses.commit()
ses.close()