import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    myPosts: []
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        allPosts: (state, action) => {
            state.allPosts = action.payload
        },
        myPosts: (state, action) => {
            console.log("====", action.payload);
            state.myPosts = action.payload
        },
    }
})

export const { allPosts, myPosts } = postsSlice.actions
export default postsSlice.reducer