import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./HomePage.css";


function HomePage() {
    const {projects, isLoading, error } = useProjects()
    console.log("I am still looking for project: ", isLoading, "!Right now I have", projects, error)

    if (isLoading) {
        return <div>I am still loading</div>
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
    <>
        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;
            })}
        </div>
    </>
    );
}

export default HomePage;


// [1,2,3].((value, index) => console.log(value))map