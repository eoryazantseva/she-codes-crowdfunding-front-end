async function postSignup({username, password, email}) {
    const url =`${import.meta.env.VITE_API_URL}/users/`;
    const body = {            
        username: username,
        password: password,
        email: email, 
    };

    console.log("PAYLOAD: ", body)


    const response = await fetch(url, {
        method:"POST", // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });



    if (!response.ok) {

        const responseBody = await response.json().catch(() => {});
        console.error("Response error:", responseBody);

        const fallbackError = 'Error trying to sign up';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        thrownewError(errorMessage);
    }

    return await response.json();
}
    export default postSignup;