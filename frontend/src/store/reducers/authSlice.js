import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const authUser = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { loggedIn } = authUser.actions
export default authUser.reducer