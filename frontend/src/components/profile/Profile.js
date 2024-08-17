import React, { useEffect, useState } from 'react'
import "./index.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { myPosts } from '../../store/reducers/postsSlice';

const Profile = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postsSlice.myPosts)

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    };

    const fetchMyPosts = async () => {
        await axios.get(`http://localhost:5555/myPosts`, { headers }).then(res => {
            dispatch(myPosts(res.data.posts))
        }).catch(e => console.log("Error", e.message))
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div style={{ maxWidth: "80vw", margin: "auto" }}>
            <div style={{ display: "flex", borderBottom: "2px solid gray" }}>
                <div style={{ display: "flex", margin: "20px auto" }}>
                    <img style={{ height: "200px", width: "200px", borderRadius: "50%" }} src='https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHwxfDB8fHww' />
                </div>
                <div style={{ width: "50%", margin: "auto" }}>
                    <div>
                        <h4>Ishan Kesharwani</h4>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5>40 Posts</h5>
                        <h5>40 Posts</h5>
                        <h5>40 Posts</h5>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {posts && posts.map(data => <>
                    <img src={data.photo} />
                </>)}
            </div>
        </div>
    )
}

export default Profile