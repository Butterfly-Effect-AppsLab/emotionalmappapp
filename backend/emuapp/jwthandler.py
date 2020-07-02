from emuapp import app
import os
from flask import Flask, redirect, make_response
from flask_jwt_extended import (JWTManager, jwt_required,
                                jwt_refresh_token_required,
                                jwt_optional, fresh_jwt_required,
                                get_raw_jwt, get_jwt_identity,
                                create_access_token, create_refresh_token,
                                set_access_cookies, set_refresh_cookies,
                                unset_jwt_cookies,unset_access_cookies)

def assign_access_refresh_tokens(user_id, url):
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))
    resp = make_response(redirect(url, 302))
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token, max_age=60*60*24*10)
    return resp

def unset_jwt():
    resp = make_response(redirect( os.environ.get("GOOGLE_REDIRECT_URI", None) + '/', 302))
    unset_jwt_cookies(resp)
    return resp

