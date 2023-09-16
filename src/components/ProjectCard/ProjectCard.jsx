import { Link } from "react-router-dom";


import "./ProjectCard.css";
import useProject from "../../hooks/use-project";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;

    // console.log('project data in projectCARD: ', projectData)
const {project, isLoading, error} = useProject(projectData.id)
const pledges = project?.pledges || []
const totalPledges = pledges.reduce((sum, pledge) => sum + pledge.amount, 0)
// const goal = project.goal
// console.log("project goal is: ", goal)

// console.log("PLEDGES:", pledges)
// // console.log("isLoading: ", isLoading)
// let firstPledge = 0
// if(isLoading == false) {
//     console.log("project data by id: ", project)
//     firstPledge =  project?.pledges[0]?.amount
// }


return (
    <div className="project-card">
        <Link to={projectLink}>
        <img src={projectData.image} />
        <h3>{projectData.title}</h3>
        <h4>${totalPledges} raised of {projectData.goal}</h4>
        </Link>
    </div>
);
}

export default ProjectCard;