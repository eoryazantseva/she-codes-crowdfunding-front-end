import CreateProject from "../../components/CreateProjectForm/CreateProjectForm";
import "./NewProjectPage.css"

function NewProjectPage() {
    return <div>
                <h1 className="new-project-header">Tell us more about you new exciting project!</h1>
                <CreateProject />;
            </div>

}

export default NewProjectPage;