import {useRef, useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LogIn = (props) => {
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        if(auth) {setSuccess(true)}
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // log in to firebase
        const auth = getAuth();
        const email = e.target[0].value; // get email
        const password = e.target[1].value // get password
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            console.log("Signed In!");
            setSuccess(true);
            // signed in
            // navigate to home page after successful login
        }).catch((error) => {
            console.error(error);
        });

    }
    return (
        <>
        {success ? (
            <section>
                <h1>Login Success</h1>
            </section>
        ) : (
        <section className='loginPage'>
            <div className='loginBox'>
            <h1>Sign in</h1>
            <form className='loginForm'
            onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input type="text" required />
                <label htmlFor="password">Password</label>
                <input type="password" required/>
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line"><Link to="/signup">Sign Up</Link>
                </span>
            </p>
            </div>
            
        </section>
        )}
        </>
)}

export default LogIn