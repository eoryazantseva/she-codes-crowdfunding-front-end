
import { useParams, useNavigate } from "react-router-dom";

import useProject from "../hooks/use-project";
import CreatePledge from "../components/PledgeForm.jsx"
import deleteProject from "../api/delete-project";

function ProjectPage() {

    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();

    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);
    console.log("testing project ----", project)

    const navigate = useNavigate();

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }


    const dateString = project.date_created

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
        }
    
    console.log(formatDate(dateString))


    // Handle project deletion

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id)
            .then(() => {
                //Redirect to the project list
                navigate("/");
            })
            .catch ((error) => {
                console.log("Error deleting project: ", error);
                // Handle error, e.g., display an error message to the user
            });
        }
    };



    return (
        <main>
            <h1>{project.title}</h1>
            <h3>Created: {formatDate(dateString)}</h3>
            <h3>Organiser:</h3>
            <img src={project.image} alt="" />
            <h3>{`Status: ${project.is_open}`}</h3>
            <h4>Project description</h4>
            <p>{project.description}</p>
            <button onClick={handleDelete}>Delete Project</button>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>${pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            <CreatePledge projectId={id} />
        </main>
    );
}

export default ProjectPage;