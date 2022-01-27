import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import anecdotesReducer from './reducers/anecdotesReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    message: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;