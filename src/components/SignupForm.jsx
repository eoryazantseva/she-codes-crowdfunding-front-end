import { useState } from "react";
import postSignup from "../api/post-signup.js";

function SignupForm({ onSuccess }) {


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });


    const handleChange = (e) => {
        setCredentials({
        ...credentials, 
        [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        postSignup(credentials)
            .then(() => {
                onSuccess();
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    };



    return (
        
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter username" onChange={handleChange} value={credentials.username}/>
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" onChange={handleChange} value={credentials.password}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" placeholder="Enter email address" onChange={handleChange} value={credentials.email} />
                </div>
                {isLoading && <p>Loading</p>}
                {error && <p>Error: {error}</p>} {/* Display error if it exists */}
                <button type="submit" onClick={handleSubmit}>Sign up</button>
            </form>
            );
        }

export default SignupForm;
