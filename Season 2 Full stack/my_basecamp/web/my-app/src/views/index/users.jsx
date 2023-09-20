import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, getUsers } from '../../services/users';


const UserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //const { id } = useParams();
  
  //Using the useeffect method to get all users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      //console.log("response data :", response.data);
      setUsers(response.data);
     // console.log('users:', users);
    };

    fetchUsers();
  }, []);

  //function to logout user
  const handleLogout = () => {
    // Clear the token from cookies or local storage
    Cookies.remove('token');
      // Redirect the user to the login page
      navigate('/signin');
  };
  //function to delete user
  const handleDelete =  (id) => {
    try {
       deleteUser(id);
      // Redirect to the same page after successful delete
     
     
    } catch (error) {
      console.error(error);
    }
      
  };
  
  return (
    <div>
       <Link className="link-button" to="/index">View Projects</Link>
       <Link to={`/register`}> <button>create new user</button></Link>
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
                  <button onClick={()=> handleDelete(user.id)}>delete User</button>
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