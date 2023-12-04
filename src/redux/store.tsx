import { createStore, combineReducers } from "redux";
import initialState from "./initialState";
import documentsReducer from "./documentsRedux";
import selectedDocumentIdReducer from "./selectedDocumentIdRedux";

// reducer

const subreducers = {
  documents: documentsReducer,
  selectedDocumentId: selectedDocumentIdReducer,
};

const reducer = combineReducers(subreducers);

// store

const store = createStore(
  reducer,
  initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const documents = store.getState().documents;
  localStorage.setItem('documents', JSON.stringify(documents));
})

export default store;
