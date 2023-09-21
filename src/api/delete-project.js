async function deleteProject(project_id) {
    // First we create the URL for the request by using the Vite environmentvariable and the API endpoint.
    const url =`${import.meta.env.VITE_API_URL}/projects/${project_id}`;
    const response = await fetch(url, { 
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem("token")}`,
            },
        });

    // Check if the request was successful

        if (!response.ok) {
            const fallbackError =`Error deleting project with id ${project_id}`;
            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
        });

    
            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        // Return a success message or any other relevant data

        return "Project deleted successfully";

}

export default deleteProject;