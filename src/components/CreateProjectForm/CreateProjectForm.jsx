import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import postProject from '../../api/post-project'
import "./CreateProjectForm.css";

function CreateProject() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        image: "",
        goal: 0,
        is_open: false,
    })

    const handleChange = (e) => {
        setProjectData({
        ...projectData, 
        [e.target.id]: e.target.value
        })
    }

    const handleChecked = (e) => {
        setProjectData({
            ...projectData,
            is_open: e.target.checked // Set is_open as a boolean
        });
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Generate the current date and time
        const currentDate = new Date().toISOString();
    
        // Include the date_created field along with other project data
        const projectDataWithDate = {
            ...projectData,
            date_created: currentDate,
        };
    
        postProject(projectDataWithDate)
            .then(() => {
                navigate(0);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };
    

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label' htmlFor="title">Project Title</label>
                <input 
                type="text" 
                id="title" 
                placeholder='Enter the name of the project' 
                onChange={handleChange} 
                className='form-input'
                />
            </div>
            <div>
                <label className='form-label' htmlFor="description">Description</label>
                <textarea 
                type="text" 
                id="description" 
                placeholder='Describe your project' 
                onChange={handleChange} 
                className='form-input'
                rows={10}
                />
            </div>
            <div>
                <label className='form-label' htmlFor="image">Image</label>
                <input 
                type="text" 
                id="image" 
                placeholder='Image URL' 
                onChange={handleChange} 
                className='form-input'
                />
            </div>
            <div>
                <label className='form-label' htmlFor="goal">Goal</label>
                <input 
                type="number" 
                id="goal"
                placeholder='$' 
                onChange={handleChange} 
                className='form-input'
                />
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="is_open"
                    onChange={handleChecked}
                />
                <label className="checkbox-label" htmlFor="is_open">The project is active</label>
            </div>
            <button className='submit-button' type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default CreateProject;