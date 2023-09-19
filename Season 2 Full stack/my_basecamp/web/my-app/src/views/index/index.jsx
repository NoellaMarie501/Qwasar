import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const IndexPage = () => {
const navigate = useNavigate();
const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
       // const token = localStorage.getItem('token'); // Retrieve the authentication token from storage
        const response = await axios.get('http://localhost:3001/projects/all', 
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
        );
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('An error occurred while fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove('token');
    // Redirect the user to the login page
    navigate('/signin');
  };
  return (
    <div>
      <Link className="link-button" to="/users">View users</Link>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
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
            </tr>
        ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;