import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateProject from "../../components/UpdateProjectForm";
import useProject from "../../hooks/use-project";


function UpdateProjectPage() {

    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    
    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(true);
    };


    return (
        <div>
            {success ? (
                <h2>The project was updated</h2>
            ) : project ? (
                <div>
                    <h2>Update Project </h2>
                    <UpdateProject project={project} onSuccess={handleSuccess} /> {/* Pass the project prop */}
                </div>
            ) : isLoading ? (
                    <p>Loading project details...</p>
                ) : (
                        <p>{error ? error.message : "Project not found"}</p>
                    )}
        </div>
);
}

export default UpdateProjectPage;