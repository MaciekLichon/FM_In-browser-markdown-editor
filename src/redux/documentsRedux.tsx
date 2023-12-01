import { IDocument, IState } from "./initialState";

// selectors
export const getAllDocuments = (state: IState) => state.documents;
export const getSavedActiveDocument = ({
  documents,
  selectedDocumentId,
}: IState) =>
  documents.filter((document) => document.id === selectedDocumentId)[0];

// actions
const createActionName = (actionName: string) => `app/documents/${actionName}`;
const REMOVE_DOCUMENT = createActionName("REMOVE_DOCUMENT");
const ADD_DOCUMENT = createActionName("ADD_DOCUMENT");
const EDIT_DOCUMENT = createActionName("EDIT_DOCUMENT");

// action creators
export const removeDocument = (payload: string) => ({
  type: REMOVE_DOCUMENT,
  payload,
});
export const addDocument = (payload: IDocument) => ({
  type: ADD_DOCUMENT,
  payload,
});
export const editDocument = (payload: IDocument) => ({
  type: EDIT_DOCUMENT,
  payload,
});

// subreducer
const documentsReducer = (statePart: IDocument[] = [], action) => {
  switch (action.type) {
    case REMOVE_DOCUMENT:
      return statePart.filter((document) => document.id !== action.payload);
    case ADD_DOCUMENT:
      return [...statePart, { ...action.payload }];
    case EDIT_DOCUMENT:
      return statePart.map((document) =>
        document.id === action.payload.id
          ? { ...document, ...action.payload }
          : document
      );
    default:
      return statePart;
  }
};

export default documentsReducer;
