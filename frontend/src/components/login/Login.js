import React, { useState } from 'react'
import axios from 'axios'
import "./index.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loggedIn } from '../../store/reducers/authSlice';

const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignIn = async() => {
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "true"
    };

    const payload = {
      email,
      password
    }

    await axios.post("http://localhost:5555/signin", payload, { headers })
      .then(res => {
        if (res.status != 201) {
          toast(res.data.message, { type: "error" });
        } else {
          setEmail("")
          setPassword("")
          toast(res.data.message, { type: "success" });
          dispatch(loggedIn(res.data.data))
          localStorage.setItem("token", res.data.data.token)
          navigate("/")
        }
      })
      .catch(e => { toast(e.response.data.message, { type: "error" }); console.error("Something went wrong", e.message) })
  }
  return (
    <div className='myCard'>
      <div className="card auth-card">
        <h2>Instagarm</h2>
        <input value={email} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignIn} className="btn waves-effect waves-light button-login">Login
        </button>
      </div>
    </div>
  )
}

export default Login