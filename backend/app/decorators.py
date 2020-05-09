from app import models as m

def init_db(func):
    def wrapper(*args, **kwargs):
        db = m.Session()
        func(*args, **kwargs, ses = db)
        db.commit()
        db.close()
    return wrapper

@init_db
def testfunc():
    print('my function')

# if __name__ == "__main__":
#     testfunc()
