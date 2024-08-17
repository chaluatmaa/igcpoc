import React, { useEffect, useState } from 'react'
import "./index.css"
import Posts from '../posts/Posts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux'
import { allPosts } from '../../store/reducers/postsSlice'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postsSlice.allPosts)
    const user = useSelector(state => state.authSlice.user)
    console.log("check posts id", posts, user);
    
    useEffect(() => {
        const user = localStorage.getItem("token")
        if (user) {
            navigate("/")
        } else {
            navigate("/login")
        }
    }, [])

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    };

    const fetchPosts = async () => {
        await axios.get(`http://localhost:5555/allposts`, { headers }).
        then(res => { 
            dispatch(allPosts(res.data.data))
        }).catch(e => console.log("Error", e.message))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const data = [
        {
            name: "Ishan",
            image: "https://images.unsplash.com/photo-1722482032940-3827f2a349ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
            description: "This is such an amazing photo and I have to get discplined.",
            comment: "This is landscape sample photo"
        },
        {
            name: "Ishan",
            image: "https://res.cloudinary.com/chalooatmaa/image/upload/v1639321925/users/i5nctpdbfngpjgdsm7ba.jpg",
            description: "This is such an amazing photo and I have to get discplined.",
            comment: "This is landscape sample photo"
        },
        {
            name: "Ishan",
            image: "https://res.cloudinary.com/chalooatmaa/image/upload/v1639238542/samples/landscapes/nature-mountains.jpg",
            description: "This is such an amazing photo and I have to get discplined.",
            comment: "This is landscape sample photo"
        },
        {
            name: "Ishan",
            image: "https://res.cloudinary.com/chalooatmaa/image/upload/v1723364178/inuil3gug9nignof2xeu.png",
            description: "This is such an amazing photo and I have to get discplined.",
            comment: "This is landscape sample photo"
        },
    ]

    return (
        <div className='home'>
            {posts && posts.map(data => (
                <Posts postedBy={data.postedBy} likes={data?.likes} id={data._id} name={data.postedBy.name} image={data.photo} title={data.title} comment={data.comments} />
            ))}
        </div>
    )
}

export default Home