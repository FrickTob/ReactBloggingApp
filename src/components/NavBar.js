import {Link} from "react-router-dom"
const NavBar = (props) => {
    return(
    <header>
        <Link to="/" className="appTitle">Blog</Link>
        <Link to="/login" className="logInLink">Log In</Link>
    </header>)
}

export default NavBar