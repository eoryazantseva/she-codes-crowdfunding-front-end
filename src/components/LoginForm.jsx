import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import postLogin from "../api/post-login.js";
import getUser from "../api/get-user.js";


function LoginForm() {

    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("HANDLE SUBMIT")

        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
                ).then((response) => {
                    console.log("RESPONSE: ", response)
                    window.localStorage.setItem("token", response.token);
                    
                    // Fetch user data and update the auth state with username and userId
                    
                    getUser(credentials.username).then((userData) => {
                        setAuth({
                            token: response.token,
                            username: userData.username,
                            userId: userData.id,
                        });
                    });
                });
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default LoginForm;
