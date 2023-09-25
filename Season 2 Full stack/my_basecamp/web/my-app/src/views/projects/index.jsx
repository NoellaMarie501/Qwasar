import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjectsContext } from "../../context/projects/projectsContext";
import { deleteProject } from "../../services/project";
import { getLoggedInUser } from "../../utils/getLoggedInUser";

const IndexPage = () => {
  const navigate = useNavigate();
  const [deleted, setIsDeleted] = useState(false);

  const { getProjects, projects } = useProjectsContext()

  useEffect(() => {
    getProjects();
  }, []);

  //const username =  getUser(projects).username;
  //setUser(getUser(projects.UserId).firstname);

  //retrive the looged in user from token

  const loggedInUserId = getLoggedInUser().id;

  //Delete function
  const handleDelete = async (id, userId, projectUserId) => {
   //console.log("projectid, userId, projectUserId,", id ,userId, projectUserId);

    //if project belongs to user, delete
    if (userId === projectUserId) {
      try {
        const response = await deleteProject(id).then((response) => {
          if (response.toString().includes("successfully")) {
            getProjects()
          }
        });

        setIsDeleted(response);
        // Redirect to the same page after successful delete
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Not allowed only owner can delete project")
    }
  };

  //function to log out user
  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove("token");
    // Redirect the user to the login page
    navigate("/signin");
  };
  return (
    <div>
      {deleted && <p>{deleted}</p>}
      <Link className="link-button" to="/users">
        View users
      </Link>
      <Link to={`/createProject`}>
        {" "}
        <button>create new project</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.user.firstname}</td>
              <td>{project.createdAt}</td>
              <td>{project.updatedAt}</td>
              <tr>
                <td>
                  <Link to={`/projects/${project.id}`}>
                    {" "}
                    <button>edit project</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(project.id, loggedInUserId, project.user.id)} disabled={loggedInUserId === project.user.id ? false: true} >
                    delete Project
                  </button>
                </td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
