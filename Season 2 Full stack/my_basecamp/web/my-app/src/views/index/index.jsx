import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
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
  return (
    <div>
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