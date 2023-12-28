import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -------- data --------
export type DocumentIdState = string;

const browserData = localStorage.getItem("documentsState");

const initialState: DocumentIdState = browserData !== null ? JSON.parse(browserData).selectedDocumentId : "0";

// -------- slice --------
const selectedDocumentIdSlice = createSlice({
    name: "selectedDocumentId",
    initialState,
    reducers: {
        updateActiveId: (state, action: PayloadAction<DocumentIdState>) => {
            return action.payload;
        },
    },
});

export const { updateActiveId } = selectedDocumentIdSlice.actions;
export default selectedDocumentIdSlice.reducer;
