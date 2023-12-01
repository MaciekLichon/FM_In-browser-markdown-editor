import { IDocumentId } from "./initialState";

// actions
const createActionName = (actionName: string) => `app/documents/${actionName}`;
const UPDATE_SELECTED_DOCUMENT_ID = createActionName("UPDATE_SELECTED_DOCUMENT_ID");

// action creators
export const updateActiveId = (payload: IDocumentId) => ({ type: UPDATE_SELECTED_DOCUMENT_ID, payload, });

// subreducer
const selectedDocumentIdReducer = (statePart = "", action) => {
  switch (action.type) {
    case UPDATE_SELECTED_DOCUMENT_ID:
      return action.payload;
    default:
      return statePart;
  }
};

export default selectedDocumentIdReducer;
