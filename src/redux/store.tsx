import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import documentsReducer from './documentsRedux';
import activeDocumentReducer from './activeDocumentRedux';

// reducer

const subreducers = {
  documents: documentsReducer,
  activeDocument: activeDocumentReducer
}

const reducer = combineReducers(subreducers);

// store

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;