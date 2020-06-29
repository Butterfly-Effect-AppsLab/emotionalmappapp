from flask import Flask, redirect, request, Response, render_template, send_from_directory, url_for, make_response
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_jwt_extended import (JWTManager, jwt_required, jwt_optional, get_jwt_identity, create_access_token, jwt_refresh_token_required, set_access_cookies)
from flask_cors import CORS
import requests
from oauthlib.oauth2 import WebApplicationClient
from emuapp import models as m
from emuapp import schemas, jwthandler
from emuapp import decorators as dec
from random import randint
from datetime import datetime
import os
import json

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)



app = Flask("__main__")
app.debug = True
app.root_path = os.path.dirname(os.path.abspath(__file__))
app.config['JSON_AS_ASCII'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get("JWT_SECRET")
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
#app.config['JWT_CSRF_CHECK_FORM'] = True
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
jwt = JWTManager(app)
jwt._set_error_handler_callbacks(app)

login_manager = LoginManager()
login_manager.init_app(app)

client = WebApplicationClient(GOOGLE_CLIENT_ID)

@jwt.unauthorized_loader
def unauthorized_callback(callback):
    # No auth header
    return redirect(os.environ.get("GOOGLE_REDIRECT_URI", None) + '/login', 302)

@jwt.invalid_token_loader
def invalid_token_callback(callback):
    # Invalid Fresh/Non-Fresh Access token in auth header
    resp = make_response(redirect(os.environ.get("GOOGLE_REDIRECT_URI", None) + '/login'))
    jwthandler.unset_jwt_cookies(resp)
    return resp, 302

@jwt.expired_token_loader
def expired_token_callback(callback):
    # Expired auth header
    resp = make_response(redirect(os.environ.get("GOOGLE_REDIRECT_URI", None) + '/token/refresh'))
    jwthandler.unset_access_cookies(resp)
    return resp, 302

@app.route('/token/refresh', methods=['GET'])
@jwt_refresh_token_required
def refresh():
    # Refreshing expired Access token
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=str(user_id))
    resp = make_response(redirect(os.environ.get("GOOGLE_REDIRECT_URI", None) + '/', 302))
    set_access_cookies(resp, access_token)
    return resp

@login_manager.user_loader
def load_user(user_id):
    return m.User.query().filter(m.User.social_id == user_id).first()

def get_google_provider_cfg():
    try:
        res = requests.get(GOOGLE_DISCOVERY_URL).json()
    except:
        res = "error" #TODO error handling
    return res

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_index(path):
    return  render_template("index.html", token=path)

@app.route('/glogin')
def get_login():
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=os.environ.get("GOOGLE_REDIRECT_URI", None) + "/glogin/callback",
        scope=["openid"],
    )
    return redirect(request_uri)

@app.route('/glogin/callback')
def create_or_update_user():
    code = request.args.get("code")
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
    token_endpoint,
    authorization_response=request.url,
    redirect_url=os.environ.get("GOOGLE_REDIRECT_URI", None) + "/glogin/callback",
    code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))
    try:
        userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        uri, headers, body = client.add_token(userinfo_endpoint)
        userinfo_response = requests.get(uri, headers=headers, data=body)
        user_id = userinfo_response.json()['sub']
        ses = m.Session()
        user = ses.query(m.User).filter(m.User.social_id == user_id).first()

        if not user:
            user_schema = schemas.UserSchema()
            new_user = user_schema.load({'social_id': user_id})
            ses.add(new_user)
            ses.commit()
            ses.refresh(new_user)
            ses.close()
            return jwthandler.assign_access_refresh_tokens(new_user.id , os.environ.get("GOOGLE_REDIRECT_URI", None) + '/registration')
        elif not user.sex:
            return jwthandler.assign_access_refresh_tokens(user.id , os.environ.get("GOOGLE_REDIRECT_URI", None) + '/registration')
        else:
           return jwthandler.assign_access_refresh_tokens(user.id , os.environ.get("GOOGLE_REDIRECT_URI", None) + '/')
    except Exception as e:
        return str(e) #TODO doplnit error handling

@app.route('/logout')
@jwt_required
def get_logout():
    return jwthandler.unset_jwt(), 302

@app.route('/api/news')
def get_news():
    ses = m.Session()
    filter_interests = []
    news_schema = schemas.NewsScheme()
    try:
        if request.args.get('interests'):
            for n in request.args.get('interests').split(','):
                filter_interests.append(n)
    except:
        pass
    news = ses.query(m.News).order_by(m.News.pub_date.desc()).limit(25)
    filtered_news = []
    if len(filter_interests) != 0:
        for n in news:
            has_interest = False
            for i in n.interests:
                if filter_interests.__contains__(i.interest):
                    has_interest = True
                    break
            if has_interest:
                filtered_news.append(n)
        result = news_schema.dump(filtered_news, many=True)
    else:
        result = news_schema.dump(news, many=True)
    ses.close()
    return {'data': result}

"""
@app.route('/api/users')
def get_users():
    ses = m.Session()
    users = ses.query(m.User)
    user_schema = schemas.UserSchema()

    result = user_schema.dump(users, many=True)
    ses.close()
    return {'data': result}
"""

@app.route('/api/surveys')
@jwt_optional
def get_surveys():
    user_id = get_jwt_identity()
    ses = m.Session()
    surveys = ses.query(m.Survey)
    survey_schema = schemas.SurveySchema(exclude=('questions', 'interests', 'residence_regions', 'work_regions'))

    result = survey_schema.dump(surveys, many=True)
    for r in result:
        #return {'err': ses.query(m.SurveyRecord).filter(m.SurveyRecord.survey_id == r['id']).filter(m.SurveyRecord.user_id == user_id).first()}
        r.update({'filled': True if ses.query(m.SurveyRecord).filter(m.SurveyRecord.survey_id == r['id']).filter(m.SurveyRecord.user_id == user_id).first() else False})
    ses.close()
    return {'data': result}

@app.route('/api/test')
@jwt_required
def get_test():
    return {'user': get_jwt_identity()}

@app.route('/api/surveys/<id>')
@jwt_required
def get_surveys_by_id(id):
    ses = m.Session()
    surveys = ses.query(m.Survey).get(id)
    survey_schema = schemas.SurveySchema()

    result = survey_schema.dump(surveys)
    ses.close()
    return {'data': result}

@app.route('/api/age')
def get_age_groups():
    year = datetime.today().year
    r = range(year-150,year)
    years = { 'year': list(reversed([*r])) }
    return {'data': years}

@app.route('/api/interests')
def get_Interest():
    ses = m.Session()
    Interest = ses.query(m.Interest)

    Interest_schema = schemas.InterestSchema()
    result = Interest_schema.dump(Interest, many=True)
    ses.close()

    return {'data': result}

@app.route('/api/cityparts')
def get_cityparts():
    ses = m.Session()
    parts = ses.query(m.Street)

    street_schema = schemas.StreetSchema()
    result = street_schema.dump(parts, many=True)
    ses.close()
    return {'data': result}

@app.route('/api/answers')
@jwt_required
def get_answers():
    ses = m.Session()
    survey_records = ses.query(m.SurveyRecord)

    survey_record_schema = schemas.SurveyRecordSchema()
    result = survey_record_schema.dump(survey_records, many=True)
    ses.close()
    return {'data': result}

@app.route('/api/regInfo')
def get_regInfo():
    ses = m.Session()
    streets = ses.query(m.Street).order_by(m.Street.sub_part).order_by(m.Street.street)

    street_schema = schemas.StreetSchema()
    streets_result = street_schema.dump(streets, many=True)

    year = datetime.today().year
    r = range(year-150,year)
    years = list(reversed([*r]))
    data = {'data': {"streets": streets_result, "years": years, "sexes": ["Female", "Male"]}}
    ses.close()
    return data

"""
@app.route('/api/registerUserOld', methods=['POST'])
def post_user():
    ses = m.Session()
    try:
        user_json = request.json
        user_schema = schemas.UserSchema()

        new_user = user_schema.load(user_json)
        ses.add(new_user)
        ses.commit()
        ses.close()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": user_json}, 201, {'ContentType':'application/json'}
"""

@app.route('/api/registerUser', methods=['POST'])
@jwt_required
def update_user():
    user_id = get_jwt_identity()
    ses = m.Session()
    try:
        user_json = request.json
        user_schema = schemas.UserSchema()

        user = ses.query(m.User).filter(m.User.id == user_id)
        user.update(user_json)
        ses.commit()
        ses.close()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": user_json}, 201, {'ContentType':'application/json'}

@app.route('/api/sendAnswer', methods=['POST'])
@jwt_required
def post_answer():
    user_id = get_jwt_identity()
    ses = m.Session()
    try:
        answer_json = request.json
        survey_record_schema = schemas.SurveyRecordSchema()
        answer_schema = schemas.AnswerSchema()
        answer_json.update({'user_id': user_id})
        new_survey_record = survey_record_schema.load(answer_json)
        ses.add(new_survey_record)
        if 'answers' in answer_json:
                new_survey_record.answers.extend(answer_schema.load(answer_json['answers'], many=True))

        ses.commit()
        ses.close()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": answer_json}, 201, {'ContentType':'application/json'}

@app.route('/api/sendNote', methods=['POST'])
@jwt_required
def post_note():
    ses = m.Session()
    try:
        note_json = request.json
        survey_note_schema = schemas.SurveyNoteSchema()

        new_survey_note = survey_note_schema.load(note_json)
        ses.add(new_survey_note)
        ses.commit()
        ses.close()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": note_json}, 201, {'ContentType':'application/json'}

@app.route('/api/createSurvey', methods=['POST'])
def post_survey():
    ses = m.Session()
    try:
        survey_json = request.json
        survey_schema = schemas.SurveySchema()
        question_schema = schemas.QuestionSchema()
        question_option_schema = schemas.QuestionOptionSchema()

        new_survey = survey_schema.load(survey_json)
        ses.add(new_survey)
        if 'interests' in survey_json:
            for interest in survey_json['interests']:
                new_survey.interests.append(ses.query(m.Interest).get(interest['id']))

        if 'questions' in survey_json:
            for question in survey_json['questions']:
                new_question = question_schema.load(question)
                new_survey.questions.append(new_question)
                if new_question.type != 'text' and 'options' in question:
                    new_question.options.extend(question_option_schema.load(question['options'], many=True))

        if 'residence_regions' in survey_json:
            for residence in survey_json['residence_regions']:
                new_survey.residence_regions.append(ses.query(m.Street).get(residence['id']))

        if 'work_regions' in survey_json:
            for work in survey_json['work_regions']:
                new_survey.work_regions.append(ses.query(m.Street).get(work['id']))
        ses.commit()
        ses.close()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": survey_json}, 201, {'ContentType':'application/json'}

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(host='0.0.0.0')