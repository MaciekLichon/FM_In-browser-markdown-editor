import { IActiveDocument } from "./initialState";

interface IAction {
  type: string;
  payload: IActiveDocument;
}

// actions

const createActionName = (actionName: string) => `app/documents/${actionName}`;
const UPDATE_ACTIVE_DOCUMENT = createActionName('UPDATE_ACTIVE_DOCUMENT');

// action creators

export const updateActiveId = (payload: IActiveDocument) => ({ type: UPDATE_ACTIVE_DOCUMENT, payload });

// subreducer

const activeDocumentReducer = (statePart = '', action: IAction) => {
  switch(action.type) {
    case UPDATE_ACTIVE_DOCUMENT:
      return action.payload
    default:
      return statePart;
  }
}

export default activeDocumentReducer;