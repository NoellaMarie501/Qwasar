import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
       // const token = localStorage.getItem('token'); // Retrieve the authentication token from storage
        const response = await axios.get('http://localhost:3001/users/all', 
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('An error occurred while fetching Users:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr>
                <td>
                    {user.id}
                </td>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.firstname}
                </td>
                <td>
                    {user.lastname}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.createdAt}
                </td>
                <td>
                    {user.updatedAt}
                </td>
            </tr>
        ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;