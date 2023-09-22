import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProject, getProjects } from "../../services/project";
import { getUser } from "../../services/users";
import { getLoggedInUser } from "../../utils/getLoggedInUser";
import { useGetProjects } from "../../utils/hooks/useGetProjects";

const IndexPage = () => {
  const navigate = useNavigate();
  // const [projects, setProjects] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [deleted, setIsDeleted] = useState(false);
  const [rerender, setRerender] = useState(true);

  // const fetchProjects = async () => {
  //   const response = await getProjects();
  //   const projectsWithUser = await Promise.all(
  //     response.data.map(async (project) => {
  //       const user = await getUser(project.UserId);
  //       return { ...project, user };
  //     })
  //   );
  //   setProjects(projectsWithUser);
  //   setRerender(!rerender);
  // };
  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  useEffect(() => {
    setRerender(!rerender)
  }, [rerender]);

  const { projects } = useGetProjects({refetch: rerender })

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
            setRerender(!rerender)
          }
        });

        console.log(response);
        setIsDeleted(response);
        // Redirect to the same page after successful delete
      } catch (error) {
        console.error(error);
      }
      setCanDelete(true);
    } else {
      setCanDelete(false);
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
          {projects.map((project) => (
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
                  {JSON.stringify({ canDelete })}
                  <button onClick={() => handleDelete(project.id, loggedInUserId, project.user.id)} disabled={canDelete} >
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
