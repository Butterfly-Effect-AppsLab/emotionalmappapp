from alembic import op
from emuapp import models as m


ses = m.Session()
try:
    ses.query(m.Interests).delete()
    ses.commit()
except:
    ses.rollback()

try:
    ses.query(m.Street).delete()
    ses.commit()
except:
    ses.rollback()

ses.commit()
ses.close()