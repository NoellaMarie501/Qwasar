import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProject, getProjects } from '../../services/project';
const IndexPage = () => {
const navigate = useNavigate();
const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects()
      //console.log("response data :", response.data);
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  const handleDelete =  (id) => {
    try {
       deleteProject(id);
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
      <Link className="link-button" to="/users">View users</Link>
      <Link to={`/register`}> <button>create new user</button></Link>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {projects.map((project) => (
            <tr>
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
                    {project.createdAt}
                </td>
                <td>
                    {project.updatedAt}
                </td>
                <tr>
                <td>
                  <Link to={`/users/${project.id}`}> <button>edit project</button></Link>
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