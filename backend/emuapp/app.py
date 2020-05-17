from flask import Flask, redirect, request, Response, render_template, send_from_directory
from flask_cors import CORS
import requests
from emuapp import models as m
from emuapp import schemas
from emuapp import decorators as dec
from random import randint
from datetime import datetime
import os

app = Flask("__main__")
app.debug = True
app.root_path = os.path.dirname(os.path.abspath(__file__))
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_index(path):
    return  render_template("index.html", token=path)

@app.route('/api/news')
def get_news():
    ses = m.Session()
    filterInterests = []
    news_schema = schemas.NewsScheme()
    try:
        if request.args.get('interests'):
            for n in request.args.get('interests').split(','):
                filterInterests.append(n)
    except:
        pass
    news = ses.query(m.News)
    filteredNews = []
    if len(filterInterests) != 0:
        for n in news:
            has_interest = False
            for i in n.interests:
                if filterInterests.__contains__(i.interest):
                    has_interest = True
                    break
            if has_interest:
                filteredNews.append(n)
        result = news_schema.dump(filteredNews, many=True)
    else:
        result = news_schema.dump(news, many=True)
    return {'data': result}

@app.route('/api/users')
def get_users():
    ses = m.Session()
    users = ses.query(m.User)
    user_schema = schemas.UserSchema()

    result = user_schema.dump(users, many=True)
    return {'data': result}

@app.route('/api/surveys')
def get_surveys():
    ses = m.Session()
    surveys = ses.query(m.Survey)
    survey_schema = schemas.SurveySchema()

    result = survey_schema.dump(surveys, many=True)
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

    return {'data': result}

@app.route('/api/cityparts')
def get_cityparts():
    ses = m.Session()
    parts = ses.query(m.Street)

    street_schema = schemas.StreetSchema()
    result = street_schema.dump(parts, many=True)
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
    return data

@app.route('/api/registerUser', methods=['POST'])
def post_user():
    ses = m.Session()
    try:
        user_json = request.json
        user_schema = schemas.UserSchema()

        new_user = user_schema.load(user_json)
        ses.add(new_user)
        ses.commit()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": user_json}, 201, {'ContentType':'application/json'}

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
        ses.commit()
    except Exception as e:
        return {'error': str(e)}, 400, {'ContentType':'application/json'}
    return {"data": survey_json}, 201, {'ContentType':'application/json'}

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(host='0.0.0.0')