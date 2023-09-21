import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProject, getProjects } from '../../services/project';
import { getUser } from '../../services/users';

const IndexPage = () => {
const navigate = useNavigate();
const [projects, setProjects] = useState([]);
const [deleted, setIsDeleted] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      const projectsWithUser = await Promise.all(
        response.data.map(async (project) => {
          const user = await getUser(project.UserId);
          return { ...project, user };
        })
      );
      setProjects(projectsWithUser);
    };
    fetchProjects();
  }, []);
  //const username =  getUser(projects).username;
  //setUser(getUser(projects.UserId).firstname);
  const handleDelete = async (id) => {
    try {
       const response = await deleteProject(id);
       console.log(response);
      setIsDeleted(response);
      // Redirect to the same page after successful delete
     
     
    } catch (error) {
      console.error(error);
    }
      
  };

  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove('token');
    // Redirect the user to the login page
    navigate('/signin');
  };
  return (
    <div>
      {deleted && <p>{deleted}</p>}
      <Link className="link-button" to="/users">View users</Link>
      <Link to={`/createProject`}> <button>create new project</button></Link>
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
        {projects.map( (project) => (
            <tr key={project.id}>
                <td>
                    {project.id}
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.description}
                </td>
                <td>
                    {project.user.firstname}
                </td>
                <td>
                    {project.createdAt}
                </td>
                <td>
                    {project.updatedAt}
                </td>
                <tr>
                <td>
                  <Link to={`/projects/${project.id}`}> <button>edit project</button></Link>
                </td>
                <td>
                  <button onClick={()=> handleDelete(project.id)}>delete Project</button>
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