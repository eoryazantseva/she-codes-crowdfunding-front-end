import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./Homepage.css";

function HomePage() {
    return (
    <div id="project-list">
        {projects.map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
        })}
    </div>
    );
}

export default HomePage;


// [1,2,3].((value, index) => console.log(value))map