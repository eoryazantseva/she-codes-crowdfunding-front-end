async function putProject(project_id, updatedProjectData, token) {
  const url = `${import.meta.env.VITE_API_URL}/projects/${project_id}`;
  
  const method = "PUT";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`,
  };

  const body = JSON.stringify(updatedProjectData);

  try {
    // Send the PUT request to update the project.
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    // Check if the request was successful.
    if (!response.ok) {
      const fallbackError = `Error updating project with ID ${project_id}`;

      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });

      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }

    // If the request was successful, return the updated project data.
    return await response.json();
  } catch (error) {
    throw new Error(`Error updating project: ${error.message}`);
  }
}

export default putProject;





