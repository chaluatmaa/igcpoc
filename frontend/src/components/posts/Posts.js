import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Comments from '../comments/Comments';

const Posts = ({name, image, title, comment, id, likes, postedBy}) => {
    const user = useSelector(state => state.authSlice.user)
    const posts = useSelector(state => state.postsSlice.allPosts)
    const [commentText, setComment] = useState("")
    const [refresh, setRefresh] = useState(false)

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "true",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    };
    const handleLike = async () => {
        await axios.put(`http://localhost:5555/like`, {postId:id}, { headers })
        .then(res => {
            setRefresh(true)
        }).catch(e => console.log("Error", e.message))
    }

    const handleUnlike = async () => {
        await axios.put(`http://localhost:5555/unlike`, {postId:id}, { headers })
        .then(res => {
            setRefresh(true)
        }).catch(e => console.log("Error", e.message))
    }

    const handleComment = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:5555/comment`, {postId:id, text:commentText}, { headers })
        .then(res => {
            console.log("check id's", res.data.comments._id, id);
            if (res.data.comments._id === id) {
                console.log("check my response", res);
            }
            setComment("")
            setRefresh(true)
        }).catch(e => console.log("Error", e.message))
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await axios.delete(`http://localhost:5555/delete/${id}`, { headers })
        .then(res => {
            console.log("check id's", res);
            setRefresh(true)
        }).catch(e => console.log("Error", e.message))
    }

    useEffect(() => {
    }, [refresh])
    

    return (
        <div>
            <div className='card home-card'>
                <div style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
                    <h5>{name}</h5>
                    {(user._id === postedBy._id) && <i onClick={(e) => handleDelete(e)} class="material-icons">delete</i>}

                </div>
                <div className='card-image'>
                    <img src={image} />
                </div>
                <div className='card-content'>
                    {!(likes.includes(user._id)) && <i onClick={() => handleLike(id)} class="material-icons">thumb_up</i>}
                    {(likes.includes(user._id)) && <i onClick={() => handleUnlike(id)} class="material-icons">thumb_down</i>}
                    <h6>{likes.length} likes</h6>
                    <h6>{title}</h6>
                    <Comments comments={comment} />
                    <form onSubmit={(e) => handleComment(e) }><input value={commentText} onChange={(e) => setComment(e.target.value)} type='text' placeholder='Add a Comment' /></form>
                </div>
            </div>
        </div>
    )
}

export default Posts