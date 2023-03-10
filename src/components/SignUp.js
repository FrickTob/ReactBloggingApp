import {Link} from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted!");

    // check if repeated password is correct
    const auth = getAuth();
    const email = e.target[1].value; // get email
    const password = e.target[2].value // get password
    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        console.log("Signed In!");
        // navigate to home page after successful login
    }).catch((error) => {
    console.error(error);
})};


const SignUp = (props) => {

    return (

        <section className='signUpPage'>
            <div className='signUpBox'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className='signUpForm'>
                <label htmlFor='firstName'>First Name</label>
                <input type="text" required/>
                <label htmlFor='email'>Email</label>
                <input type="email" required />
                <label htmlFor='password'>Password</label>
                <input type="password" id='password'required/>
                <label htmlFor='password'>Repeat Password</label>
                <input type="password" id='passwordRepeat'required/>
                

                <button>Register</button>
            </form>
            <p>Already Have an Account? <br />
            <Link to="/login">Log In</Link></p>
            </div>
        </section>
)}

export default SignUp