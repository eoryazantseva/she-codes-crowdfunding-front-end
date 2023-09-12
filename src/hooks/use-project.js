import { useState, useEffect } from"react";

import getProject from "../api/get-project";

export default function useProject(project_id) {

    // Here we use the useState hook to create a state variable called projectsand a function to update it called setProjects. We initialize the statevariable with an empty array.
    const [project, setProject] = useState([]);


    // We also create a state variable called isLoading and error to keep track ofthe loading state and any errors that might occur.

    const [isLoading, setIsLoading] =useState(true);
    const [error, setError] =useState();

    // We use the useEffect hook to fetch the projects from the API and update thestate variables accordingly.// This useEffect will only run once, when the component this hook is used inis mounted.
    useEffect(() => {
        getProject(project_id)
        .then((project) => {
            setProject(project);
            setIsLoading(false);
        })
        .catch((error) =>{
            setError(error); 
            setIsLoading(false);
        });
    }, []);

// Finally, we return the state variables and the error. As the state in thishook changes it will update these values and the component using this hookwill re-render.

    return { project, isLoading, error };

}