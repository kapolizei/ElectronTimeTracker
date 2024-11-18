import {configureStore, createSlice} from "@reduxjs/toolkit";

const apiDataSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
        setData: (state, action) => action.payload
    }
})

const counterSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
        setData: (state, action) => action.payload
    }
})
export const {setData} = apiDataSlice.actions;

const store = configureStore({
    reducer:{
        data: counterSlice.reducer
    }
})

export default store