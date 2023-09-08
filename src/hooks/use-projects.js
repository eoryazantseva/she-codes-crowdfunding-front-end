import{ useState, useEffect }from"react";

import getProjects from "../api/get-projects";

export default function useProjects() {
    // Here we use the useState hook to create a state variable called projectsand a function to update it called setProjects. We initialize the statevariable with an empty array.
    const [projects, setProjects] = useState([]);

    // We also create a state variable called isLoading and error to keep track ofthe loading state and any errors that might occur.

    const [isLoading, setIsLoading] =useState(true);
    const [error, setError] =useState();

    // We use the useEffect hook to fetch the projects from the API and update thestate variables accordingly.// This useEffect will only run once, when the component this hook is used inis mounted.
    // useEffect(() => {

