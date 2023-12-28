import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DocumentIdState } from "./selectedDocumentIdRedux";

// -------- selectors --------
export const getAllDocuments = (state: RootState) => state.documents;
export const getSavedActiveDocument = ({ documents, selectedDocumentId }: RootState) =>
    documents.filter((document) => document.id === selectedDocumentId)[0];

// -------- data --------
export interface IDocument {
    id: DocumentIdState;
    createdAt: string;
    name: string;
    content: string;
}
export type IDocumentsState = IDocument[];

const browserData = localStorage.getItem("documentsState");

const initialState: IDocumentsState =
    browserData !== null
        ? JSON.parse(browserData).documents
        : [
              {
                  id: "0",
                  createdAt: "01-12-2023",
                  name: "welcome.md",
                  content:
                      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
              },
              {
                  id: "1",
                  createdAt: "02-12-2023",
                  name: "untitled-document.md",
                  content: "",
              },
          ];

// -------- slice --------
const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        removeDocument: (state, action: PayloadAction<DocumentIdState>) => {
            return state.filter((document) => document.id !== action.payload);
        },
        addDocument: (state, action: PayloadAction<IDocument>) => {
            state.push(action.payload);
        },
        editDocument: (state, action: PayloadAction<IDocument>) => {
            const selectedDocument = state.find((document) => document.id === action.payload.id);
            const newDoc = action.payload;

            if (selectedDocument) {
                const index = state.indexOf(selectedDocument);
                state[index] = newDoc;
                // selectedDocument.content = content;
                // selectedDocument.name = name;
            }
        },
    },
});

export const { removeDocument, addDocument, editDocument } = documentsSlice.actions;
export default documentsSlice.reducer;

// // actions
// const createActionName = (actionName: string) => `app/documents/${actionName}`;
// const REMOVE_DOCUMENT = createActionName("REMOVE_DOCUMENT");
// const ADD_DOCUMENT = createActionName("ADD_DOCUMENT");
// const EDIT_DOCUMENT = createActionName("EDIT_DOCUMENT");

// // action creators
// export const removeDocument = (payload: string) => ({ type: REMOVE_DOCUMENT, payload });
// export const addDocument = (payload: IDocument) => ({ type: ADD_DOCUMENT, payload });
// export const editDocument = (payload: IDocument) => ({ type: EDIT_DOCUMENT, payload });

// // subreducer
// const documentsReducer = (statePart: IDocument[] = [], action: any) => {
//     switch (action.type) {
//         case REMOVE_DOCUMENT:
//             return statePart.filter((document) => document.id !== action.payload);
//         case ADD_DOCUMENT:
//             return [...statePart, { ...action.payload }];
//         case EDIT_DOCUMENT:
//             return statePart.map((document) =>
//                 document.id === action.payload.id ? { ...document, ...action.payload } : document
//             );
//         default:
//             return statePart;
//     }
// };

// export default documentsReducer;
