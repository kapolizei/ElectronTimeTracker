import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const apiDataSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {
        setData: (state, action) => action.payload,
    },
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    apiDataSlice.reducer
);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export const { setData } = apiDataSlice.actions;
export { store, persistor };
