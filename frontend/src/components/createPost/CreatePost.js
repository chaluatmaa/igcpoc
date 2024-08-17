import React, { useState } from 'react'
import "./index.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Loader from '../loader/Loader';

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()

    const handleUpload = async () => {
        setDisable(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'instagram_clone');
        formData.append('cloud_name', 'chalooatmaa');

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/chalooatmaa/image/upload", formData);
            if (res.data) {
                setDisable(false);
                return res.data.secure_url;  // Return the URL after setting it
            }
        } catch (error) {
            setDisable(false);
            console.error("Something went wrong");
        }
        return null;
    };

    const handleSubmit = async () => {
        const imageUrl = await handleUpload()

        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "true",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        };

        const payload = {
            title,
            body: description,
            photo: imageUrl
        }

        await axios.post("http://localhost:5555/createPost", payload, { headers })
            .then(res => {
                setDisable(false)
                if (res.status != 201) {
                    toast(res?.data?.message, { type: "error" });
                } else {
                    setTitle("")
                    setDescription("")
                    setFile("")
                    toast(res?.data?.message, { type: "success" });
                    navigate("/")
                }
            })
            .catch(e => {
                setDisable(false)
                toast(e?.response?.data?.message, { type: "error" }); console.error("Something went wrong", e.message)
            })
    }
    return (
        <>
            <div className='card input-field set-position' style={{ margin: "10vh auto", padding: "50px", maxWidth: "500px" }}>
                <input onChange={(e) => setTitle(e.target.value)} type='text' placeholder='title' />
                <input onChange={(e) => setDescription(e.target.value)} type='text' placeholder='body' />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1 lighten-2">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button disabled={disable} className='btn-pos btn wave-effect waves-light #64b5f6 blue darken-1 lighten-2' onClick={handleSubmit}>Submit Post</button>
            </div>
            {disable && <Loader />}
        </>
    )
}

export default CreatePost