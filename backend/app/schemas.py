from marshmallow import Schema, fields, pprint, EXCLUDE
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
