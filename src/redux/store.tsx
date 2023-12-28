import { configureStore } from "@reduxjs/toolkit";
import documentsReducer from "./documentsRedux";
import selectedDocumentIdReducer from "./selectedDocumentIdRedux";

export const store = configureStore({
    reducer: {
        documents: documentsReducer,
        selectedDocumentId: selectedDocumentIdReducer,
    },
});

store.subscribe(() => {
    const documents = store.getState();
    localStorage.setItem("documentsState", JSON.stringify(documents));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
