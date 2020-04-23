import { createStore, applyMiddlewear, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';