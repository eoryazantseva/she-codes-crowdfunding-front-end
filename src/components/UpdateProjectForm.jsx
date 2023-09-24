import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import putProject from '../api/put-project';
import { useAuth } from '../hooks/use-auth';

function UpdateProject({project}) {

    const { id } = useParams();
    const navigate = useNavigate();
    const [updatedProjectData, setUpdatedProjectData] = useState({
        title: project.title || '',
        description: project.description || '',
        goal: project.goal || '',
        image: project.image || '',
        is_open: project.is_open || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const { auth } = useAuth();



    // Update 'updatedProjectData' when 'project' prop changes
    useEffect(() => {
        setUpdatedProjectData({
            title: project.title || '',
            description: project.description || '',
            goal: project.goal || '',
            image: project.image || '',
            is_open: project.is_open || '',
        });
    }, [project]);
    
    //Function to handle the update of the project

    const handleUpdateProject = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // check if the user is the owner of the project
            if (parseInt(auth.userId) !== parseInt(project.owner)) {
                throw new Error("You are not the owner of this project.")
            }

            // Call putProject to update the project
            const updatedProject = await putProject(id, updatedProjectData);
            console.log("Project updated: ", updatedProject);
            setIsLoading(false);
            navigate(`/project/${id}`); // Redirect back to the project page
        } catch (error) {
            console.error("Error updating project: ", error);
            setIsLoading(false);
            setError(error.message);
        }
    };

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <form onSubmit={handleUpdateProject}>
            <div>
                <label htmlFor="title">Project Title</label>
                <input 
                type="text" 
                id="title"
                value={updatedProjectData.title}
                onChange={(e) =>
                    setUpdatedProjectData({...updatedProjectData, title: e.target.value})
                }
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input 
                type="text" 
                id="description" 
                value={updatedProjectData.description}
                onChange={(e) =>
                    setUpdatedProjectData({...updatedProjectData, description: e.target.value })
                }
                />
            </div>
            <div>
                <label htmlFor="image">Image</label>
                <input 
                type="text" 
                id="image" 
                value={updatedProjectData.image}
                onChange={(e) =>
                    setUpdatedProjectData({...updatedProjectData, image: e.target.value })
                }
                />
            </div>
            <div>
                <label htmlFor="goal">Goal</label>
                <input 
                type="number" 
                id="goal"
                value={updatedProjectData.goal}
                onChange={(e) =>
                    setUpdatedProjectData({...updatedProjectData, goal: e.target.value })
                }
                />
            </div>
            <div>
                <label htmlFor='is_open'>The project is active</label>
                <input
                type="checkbox"
                id="is_open"
                onChange={(e) =>
                    setUpdatedProjectData({...updatedProjectData, is_open: e.target.checked })
                }
                />
            </div>
            <button type="submit" onClick={handleUpdateProject} disabled={isLoading}>
                {isLoading ? "Updating..." : "Save Changes"}
            </button>
            {error && <p className='error-message'>{error}</p>}
        </form>
    );
}

export default UpdateProject;