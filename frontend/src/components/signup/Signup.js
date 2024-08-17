import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import "./index.css"
const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate =useNavigate()
  const handleSignUp = () => {
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "true"
    };
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (name.length < 6) {
      return toast("Name must be atleast 6 characters long", { type: "error" })
    }
    if (!emailPattern.test(email)) {
      return toast("Entered email has invalid format", { type: "error" })
    }
    // if (!(password.includes(['#', '!', '@', '%', '^', '&', '_', '-', '=', '+']))) {
    //   return toast("Please include special character in password", {type:"error"})
    // }

    const payload = {
      name: name.toLowerCase(),
      email,
      password
    }

    axios.post("http://localhost:5555/signup", payload)
      .then(res => {
        if (res.status !== 201) {
          toast(res.data.message, { type: "error" });
        } else {
          setName("")
          setEmail("")
          setPassword("")
          toast(res.data.message, { type: "success" });
          navigate("/login")
        }
      })
      .catch(e => { toast(e.response.data.message, { type: "error" }); console.error("Something went wrong", e.message) })
  }

  return (
    <div className='myCard'>
      <div className="card auth-card">
        <h2>Sign Up</h2>
        <input autoComplete='off' value={name} type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input autoComplete='off' value={email} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input autoComplete='off' value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button className="btn waves-effect waves-light button-login" onClick={handleSignUp}>Login
        </button>
        <p>Already Have an account ? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Login