import { signOut, getAuth } from "firebase/auth"
import {Link} from "react-router-dom"
const NavBar = (props) => {

    return(
    <header>
        <Link to="/" className="appTitle">Blogged Up</Link>
        {props.isLoggedIn ? 
        <button className="signOutButton" onClick={() => {signOut(getAuth())}}>Log Out</button> : 
        <Link to="/login" className="logInLink">Log In</Link>}
    </header>)
}

export default NavBar