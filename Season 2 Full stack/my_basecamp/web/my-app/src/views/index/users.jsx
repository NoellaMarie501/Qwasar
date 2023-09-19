import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const UserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
       // const token = localStorage.getItem('token'); // Retrieve the authentication token from storage
        const response = await axios.get('http://localhost:3001/users/all', 
      
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('An error occurred while fetching Users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove('token');
      // Redirect the user to the login page
      navigate('/signin');
    
  };
  return (
    <div>
       <Link className="link-button" to="/index">View Projects</Link>
       <button onClick={handleLogout}>Logout</button>
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
            <th>Actions</th>
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
                <tr>
                <td>
                  <Link to={`/users/${user.id}`}> <button>edit User</button></Link>
                </td>
                <td>
                  <Link to="/index"> <button>delete User</button></Link>
                </td>
                </tr>

            </tr>
        ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;