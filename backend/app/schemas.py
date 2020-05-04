from marshmallow import Schema, fields, pprint, EXCLUDE, post_load
from app import models as m
from random import randint

class Author(fields.Field):
    """Field that serializes to a title case string and deserializes
    to a lower case string.
    """

    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return "Neznamy"
        return value

    def _deserialize(self, value, attr, data, **kwargs):
        return value

class NewsScheme(Schema):
    title = fields.Str()
    description = fields.Str()
    author = Author(attribute="author",allow_none = True)
    feedback = fields.Method("show_feedback")

    def show_feedback(self, obj):
        return randint(0,1)

    class Meta:
        unknown = EXCLUDE

class InterestSchema(Schema):
    id = fields.Integer()
    interest = fields.Str()

    class Meta:
        model = m.Interest

class UserSchema(Schema):
    id = fields.Integer()
    sex = fields.String()
    residence_location = fields.String()
    work_location = fields.String()
    birthyear = fields.Integer()

    class Meta:
        model = m.User

    @post_load
    def make_user(self, data, **kwargs):
        return m.User(**data)

class StreetSchema(Schema):
    id = fields.Integer()
    street = fields.Str()
