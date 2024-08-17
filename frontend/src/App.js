import './App.css';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';
import Storetest from './components/storeTest/Storetest';
import Home from './components/home/Home';
import CreatePost from './components/createPost/CreatePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import authSlice, { loggedIn } from './store/reducers/authSlice';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { verifyUserThunk } from './components/helpers';
import { toast } from 'materialize-css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})
  const userAuth = useSelector(state => state.authSlice.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    //   if (localStorage.getItem("token")) {
    //     dispatch(verifyUserThunk()).then(result => {
    //         console.log("User data:", result);
    //         if ((result) && Boolean(result.data.user)) {
    //           setIsAuthenticated(true)
    //         }else{
    //           setIsAuthenticated(false)
    //           toast("User logged Out", { type: "error" });
    //         }
    //         // You can use the result here if needed
    //     }).catch(error => {
    //         console.error("Failed to verify user:", error);
    //     });
    // }
    dispatch(verifyUserThunk())
    // .then(result => setUser(result.data.user)).catch((e) => setUser({}))
    if (Boolean(userAuth)) {
      setIsAuthenticated(true)
      navigate("/")
    } else {
      setIsAuthenticated(false)
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/storetest"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Storetest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createPost"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreatePost />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
