import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectPage.css";
import useProject from "../../hooks/use-project";
import CreatePledge from "../../components/PledgeForm/PledgeForm.jsx"
import deleteProject from "../../api/delete-project";
import getUserById from "../../api/get-user-by-id";


function ProjectPage() {

    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();

    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);
    console.log("testing project ----", project)

    const navigate = useNavigate();

    const [organiserUsername, setOrganiserUsername] = useState("");
    const [supporterUsernames, setSupporterUsernames] = useState([]);

    useEffect(() => {
        // Function to fetch organiser's username
        const fetchOrganiserUsername = async () => {
            if (project && project.owner) {
                try {
                    // Fetch the user by ID
                    const user = await getUserById(project.owner);

                    // Set the organiser's username
                    setOrganiserUsername(user.username);
                } catch (error) {
                    console.error(
                        `Error fetching username for user with ID ${project.owner}:`,
                        error
                    );
                    // Handle the error gracefully
                    setOrganiserUsername("Unknown Organizer");
                }
            }
        };

        // Fetch organizer's username when the project data is available
        if (project) {
            fetchOrganiserUsername();
        }
    }, [project]);


    useEffect(() => {
        // Function to fetch supporter usernames for all pledges
        const fetchSupporterUsernames = async () => {
            if (project && project.pledges) {
                const usernames = await Promise.all(
                    project.pledges.map(async (pledgeData) => {
                        try {
                            // Fetch the user by ID
                            const user = await getUserById(pledgeData.supporter);

                            // Check if the supporter is anonymous

                            const supporterUsername = pledgeData.anonymous
                                ? "Anonymous"
                                : user.username;

                            return supporterUsername;

                        } catch (error) {
                            console.error(
                                `Error fetching username for user with ID ${pledgeData.supporter}:`,
                                error
                            );
                            return "Unknown User"; // Handle the error gracefully
                        }
                    })
                );
                setSupporterUsernames(usernames);
            }
        };

    // Fetch supporter usernames when the project data is available
    if (project) {
        fetchSupporterUsernames();
    }
}, [project]);

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

    // Create a state for the updated project data
    

    return (
        <main>
            <h1>{project.title}</h1>
            <h3>Created: {formatDate(dateString)}</h3>
            <h3>Organiser: {organiserUsername}</h3>
            <img className="project-image" src={project.image} alt="" />
            <h4>About the Project</h4>
            <p>{project.description}</p>
            <button className="delete-button" onClick={handleDelete}>Delete Project</button>
            <button className="update-button"><Link to={`/update-project/${project.id}`}>Update Project</Link></button>
            <h4>Contributions:</h4>
            <ul>
                {project.pledges.map((pledgeData, key) => (
                    <li key={key}>
                        ${pledgeData.amount} from {supporterUsernames[key]}
                    </li>
                ))}
            </ul>
            <h4 className="contribute-now-heading">Contribute to this project to help make this dream a reality</h4>
            <CreatePledge projectId={id} />
        </main>
    );
}

export default ProjectPage;