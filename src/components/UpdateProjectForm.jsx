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
        <div className='form-container'>
            <form onSubmit={handleUpdateProject}>
                <div>
                    <label htmlFor="title" className='form-label'>Project Title</label>
                    <input 
                    type="text" 
                    id="title"
                    className='form-input'
                    value={updatedProjectData.title}
                    onChange={(e) =>
                        setUpdatedProjectData({...updatedProjectData, title: e.target.value})
                    }
                    />
                </div>
                <div>
                    <label htmlFor="description" className='form-label'>Description</label>
                    <textarea 
                    type="text" 
                    id="description" 
                    className='form-input'
                    rows={10}
                    value={updatedProjectData.description}
                    onChange={(e) =>
                        setUpdatedProjectData({...updatedProjectData, description: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label htmlFor="image" className='form-label'>Image</label>
                    <input 
                    type="text" 
                    id="image" 
                    className='form-input'
                    value={updatedProjectData.image}
                    onChange={(e) =>
                        setUpdatedProjectData({...updatedProjectData, image: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label htmlFor="goal" className='form-label'>Goal</label>
                    <input 
                    type="number" 
                    id="goal"
                    className='form-input'
                    value={updatedProjectData.goal}
                    onChange={(e) =>
                        setUpdatedProjectData({...updatedProjectData, goal: e.target.value })
                    }
                    />
                </div>
                <div className='checkbox-container'>

                    <input
                    type="checkbox"
                    id="is_open"
                    onChange={(e) =>
                        setUpdatedProjectData({...updatedProjectData, is_open: e.target.checked })
                    }
                    />
                    <label htmlFor='is_open' className='checkbox-label'>The project is active</label>
                </div>
                <div className='button-container'>
                    <button type="submit" onClick={handleUpdateProject} disabled={isLoading} className='submit-button'>
                        {isLoading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
                {error && <p className='error-message'>{error}</p>}
            </form>
        </div>
    );
}

export default UpdateProject;