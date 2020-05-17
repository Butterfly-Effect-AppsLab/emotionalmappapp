from marshmallow import Schema, fields, pprint, EXCLUDE, post_load
from emuapp import models as m
from random import randint

class Author(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return "Neznamy"
        return value

    def _deserialize(self, value, attr, data, **kwargs):
        return value

class InterestSchema(Schema):
    id = fields.Integer()
    interest = fields.Str()

    class Meta:
        model = m.Interest

    @post_load
    def make_interest(self, data, **kwargs):
        return m.Interest(**data)

class NewsScheme(Schema):
    title = fields.Str()
    description = fields.Str()
    author = Author(attribute="author",allow_none = True)
    feedback = fields.Bool()
    interests = fields.Nested(InterestSchema, many=True)

    @post_load
    def make_news(self, data, **kwargs):
        return m.News(**data)

    class Meta:
        unknown = EXCLUDE
        model = m.News

class StreetSchema(Schema):
    id = fields.Integer()
    street = fields.Str()
    sub_part = fields.Str()
    part = fields.Str()

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    sex = fields.String(required=True)
    residence_location_id = fields.Integer(load_only=True)
    work_location_id = fields.Integer(load_only=True)
    residence_location = fields.Nested(StreetSchema, dump_only=True)
    work_location = fields.Nested(StreetSchema, dump_only=True)
    birthyear = fields.Integer(required=True)

    class Meta:
        model = m.User

    @post_load
    def make_user(self, data, **kwargs):
        return m.User(**data)

class QuestionOptionSchema(Schema):
    id = fields.Integer(dump_only=True)
    option = fields.String(required=True)

    class Meta:
        model = m.QuestionOption
        unknown = EXCLUDE

    @post_load
    def make_question_option(self, data, **kwargs):
        return m.QuestionOption(**data)

class QuestionSchema(Schema):
    id = fields.Integer(dump_only=True)
    question = fields.String(required=True)
    type = fields.String(required=True)
    options = fields.Nested(QuestionOptionSchema, many=True, dump_only=True)

    class Meta:
        model = m.Question
        unknown = EXCLUDE

    @post_load
    def make_question(self, data, **kwargs):
        return m.Question(**data)

class SurveySchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    estimated_time = fields.Integer()
    age_group_bottom = fields.Integer()
    age_group_top = fields.Integer()
    interests = fields.Nested(InterestSchema, many=True, dump_only=True)
    questions = fields.Nested(QuestionSchema, many=True, dump_only=True)

    class Meta:
        model = m.Survey
        unknown = EXCLUDE

    @post_load
    def make_survey(self, data, **kwargs):
        return m.Survey(**data)