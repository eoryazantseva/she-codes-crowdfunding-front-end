async function postPledge({amount, comment, anonymous, project}) {
    const url =`${import.meta.env.VITE_API_URL}/pledges/`;
    const body = {
        "amount": Number(amount),
        "comment": comment,
        "anonymous": anonymous,
        "project": project,
    }
    console.log("PAYLOAD: ", body)
    const response = await fetch(url, {
        method:"POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const fallbackError = 'Error sending the pledge';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        thrownewError(errorMessage);
    }

    return await response.json();
}
    export default postPledge;
