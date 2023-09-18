import React, { useState } from "react"
import axios from "axios";

export default function Register(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("from frontend",email);
        console.log(lastname);

        try {
            const response =  axios.post('http://localhost:3001/users/register', { username: username, password:password, firstname: firstname, lastname: lastname, email: email});
            console.log(JSON.parse(response.data));
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div className="auth">
            <form onSubmit={handleSubmit} className="register-form">
            <h1>Register</h1><br />
            <label htmlFor="username">Username: </label>
            <input value = {username} onChange ={(e) => setUsername(e.target.value)}  type = "text" placeholder = "enter user name" name = "username"></input><br />
            <label htmlFor="password">Password: </label>
            <input value = {password} onChange ={(e) => setPassword(e.target.value)} type = "text" placeholder = "enter password" name = "password"></input><br />
            <label htmlFor="firstname">First Name: </label>
            <input value = {firstname} onChange ={(e) => setFirstname(e.target.value)} type ="text" placeholder = "enter first name" name = "firstname"></input><br />
            <label htmlFor="lastname">Last Name: </label>
            <input value = {lastname} onChange ={(e) => setLastname(e.target.value)} type = "text" placeholder = "enter last name" name = "lastname"></input><br />
            <label htmlFor="email">Email: </label>
            <input value = {email} onChange ={(e) => setEmail(e.target.value)} type = "email" placeholder = "enter email" name = "email"></input><br />
            <button type = "submit">Submit</button><br />
            </form>
            <button className="link-button" onClick={() => props.onformSwitch('signin')}>Already have an accout? Sign In</button>
        </div>
    )
    
}