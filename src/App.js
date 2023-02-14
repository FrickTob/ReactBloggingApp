
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation} from "react-router-dom";
import { Auth, getAuth } from "firebase/auth";
import './styles/App.css'
import './styles/login.css'
import './styles/signup.css'
import './styles/homepage.css'
import './styles/general.css'
import './styles/newentry.css'
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp.js'
import HomePage from './components/HomePage'
import NavBar from "./components/NavBar";
import NewEntry from "./components/NewEntry";
import Footer from "./components/Footer";
import BlogView from "./components/BlogView";

// make protected routes and start on login screen
// update nav page based on user login

const App = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged(function(user) {
            if(user) {
                setLoggedIn(true)
        }
            else {setLoggedIn(false)}
        })
        if (location.pathname != "/signup" && !loggedIn) {navigate('/login')}
    }, [navigate, loggedIn])


    return(
    <>
        <NavBar />
        <Routes>
            <Route path = "/" element={<HomePage />} />
            <Route path = "/login" element={<LogIn />}/>
            <Route path = "/signup" element={<SignUp />}/>
            <Route path = "/newEntry" element={<NewEntry />}/>
        </Routes>
        <Footer />
    </>);
}

export default App;
