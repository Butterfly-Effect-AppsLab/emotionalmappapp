from emuapp import models as m

def init_db(func):
    def wrapper(*args, **kwargs):
        db = m.Session()
        value = func(*args, **kwargs, ses = db)
        db.close()
        return value
    return wrapper

@init_db
def testfunc():
    print('my function')

# if __name__ == "__main__":
#     testfunc()
