import React, { useEffect, useState } from 'react'
import "./index.css"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = useSelector(state => state.authSlice.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(Boolean(user._id)){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/login', { replace: true });
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                    <Link to={"/"} className='brand-logo'>Instagram</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {!Boolean(isAuthenticated) && <li><Link to={"/login"}>Login</Link></li>}
                        {!Boolean(isAuthenticated) && <li><Link to={"/signup"}>Sign Up</Link></li>}
                        {Boolean(isAuthenticated) && <li><Link to={"/"}>Home</Link></li>}
                        {Boolean(isAuthenticated) && <li><Link to={"/profile"}>Profile</Link></li>}
                        {Boolean(isAuthenticated) && <li><Link to={"/createPost"}>Create Post</Link></li>}
                        {Boolean(isAuthenticated) && <li><Link onClick={handleLogout}>Logout</Link></li>}
                        {/* <li><Link to={"/storetest"}>Storetest</Link></li> */}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar