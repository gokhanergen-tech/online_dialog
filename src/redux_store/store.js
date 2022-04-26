import reducers from './reducers/reducers'
import {logger} from 'redux-logger'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"

const store=createStore(combineReducers(reducers),composeWithDevTools(applyMiddleware(logger)));

export default store;