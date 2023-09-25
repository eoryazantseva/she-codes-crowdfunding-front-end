import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateProject from "../../components/UpdateProjectForm";
import useProject from "../../hooks/use-project";
import "./UpdateProjectPage.css";


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
                <h1>The project was updated</h1>
            ) : project ? (
                <div>
                    <h2 className="update-project-header">Update Project </h2>
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