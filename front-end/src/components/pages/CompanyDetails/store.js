import { combineReducers, createStore } from 'redux';
import selectionReducer from './reducers/selection';
import companyReducer from './reducers/company';

const rootReducer = combineReducers({ companyReducer, selectionReducer });
export const store = createStore(rootReducer);
