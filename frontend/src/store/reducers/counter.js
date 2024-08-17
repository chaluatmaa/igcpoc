import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0
}

const counterSlice = createSlice({
    name: "increment/decrement",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.counter = action.payload.count++
        },
        decrement: (state, action) => {
            state.counter = action.payload.count--
        }
    }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer