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


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("HANDLE SUBMIT")

        if (credentials.username && credentials.password) {

            try {
                // call postLogin to get the token
                const response = await postLogin(credentials.username, credentials.password)
                console.log("RESPONSE: ", response);


                //Store the token in the local storage
                window.localStorage.setItem("token", response.token);

                // Fetch user data and update the auth state with username and userId
                const userData = await getUser(credentials.username);
                console.log("USER DATA: ", userData);

                //Store the username and userId in local storage
                window.localStorage.setItem("username", userData.username);
                window.localStorage.setItem("userId", userData.id);


                //Update the auth state with the token, username, amd userId
                setAuth({
                    token: response.token,
                    username: userData.username,
                    userId: userData.id,
                });
                } catch (error) {
                    console.error("Error during login: ", error)
            }
        }
    }

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
