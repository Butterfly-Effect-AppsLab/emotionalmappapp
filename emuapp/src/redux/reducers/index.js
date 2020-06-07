import { combineReducers } from "redux";
import registration from "./registration";
import user from "./user";
import surveys from "./surveys";
import survey from "./survey";


export default combineReducers({ registration, user, surveys, survey });
