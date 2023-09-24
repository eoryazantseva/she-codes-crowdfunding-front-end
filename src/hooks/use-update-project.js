import { useState, useEffect } from "react";
import putProject from "../api/put-project";


export default function useUpdateProject(project_id) {
    const [updateProject, setUpdateProject] = useState([]);
    const [isUpdateLoading, setIsUpdateLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        putProject(project_id)
        .then((updateProject) => {
            setUpdateProject(updateProject);
            setIsUpdateLoading(false);
        })
        .catch((error) => {
            setUpdateError(error);
            setIsUpdateLoading(false);
        });
    }, []);

    return { updateProject, isUpdateLoading, UpdateError };
}
