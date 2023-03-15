import {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const LogIn = (props) => {
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const auth = getAuth();
        if(auth.currentUser) {setSuccess(true)}
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // log in to firebase
        const auth = getAuth();
        const email = e.target[0].value; // get email
        const password = e.target[1].value // get password
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            setSuccess(true);
            // signed in
            // navigate to home page after successful login
        }).catch((error) => {
            console.error(error);
            setErrMsg('' + error)
        });

    }
    return (
        <>
        {success ? (
            navigate('/')
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
            <p className='loginErrorMSG'>{errMsg}</p>
            </div>
            
        </section>
        )}
        </>
)}

export default LogIn