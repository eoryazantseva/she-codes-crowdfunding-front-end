async function postProject({title, description, image, goal, is_open, date_created}) {
    const url =`${import.meta.env.VITE_API_URL}/projects/`;
    const body = {
        title: title,
        description: description,
        image: image,
        goal: Number(goal),
        is_open: is_open,
        date_created: date_created,
    };

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
        const responseBody = await response.json().catch(() => {});
        console.error("Response error:", responseBody);
        const fallbackError = 'Error sending the project';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        thrownewError(errorMessage);
    }

    return await response.json();
}
    export default postProject;
