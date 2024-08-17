import { configureStore } from "@reduxjs/toolkit"
import counter from "./reducers/counter"
import { increment, decrement } from "./reducers/counter"
import authSlice, { loggedIn } from "./reducers/authSlice"
import postsSlice, { allPosts, myPosts } from "./reducers/postsSlice"

const store = configureStore({
    reducer: {
        counter,
        increment,
        decrement,
        loggedIn,
        authSlice,
        postsSlice,
        myPosts,
        allPosts
    }
})

export default store