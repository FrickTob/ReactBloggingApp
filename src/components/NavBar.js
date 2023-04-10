import { signOut, getAuth } from "firebase/auth"
import {Link} from "react-router-dom"
import MyDropdown from "./MyDropdown"
const NavBar = (props) => {

        
    const monthDropdownOptions = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const yearDropdownOptions = ['All Years', '2020', '2021', '2022', '2023']

    return(
    <header>
        <Link to="/" className="appTitle">Blog Blog</Link>
        {props.isLoggedIn ? 
        <>
            <div className='filterWrapper'>
                <MyDropdown type={'Month'} options={monthDropdownOptions}/>
                <MyDropdown type={'Year'} options={yearDropdownOptions}/> {/* Make automatic depending on user posts */}
            </div>
            <button className="signOutButton" onClick={() => {signOut(getAuth())}}>Log Out</button>
        </> : 
        <Link to="/login" className="logInLink">Log In</Link>}
    </header>)
}

export default NavBar