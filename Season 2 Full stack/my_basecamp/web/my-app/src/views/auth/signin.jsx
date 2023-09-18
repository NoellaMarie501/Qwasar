import React, { useState } from "react"
import axios from "axios";
import Cookies from 'js-cookie';

export default function SignIn(probs){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        try {
            const response = await axios.post('http://localhost:3001/users/signin', {email: email, password: password});
            console.log(response.data.token);

            const { token } = response.data;

            // Save the token in a cookie
            Cookies.set('token', token, { expires: 0.1 }); // Set the expiration time as per your requirement
        
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="auth">
            <form onSubmit={handleSubmit} className="signin-form">
            <h1>Sign In</h1> <br />
            <label htmlFor="email">Email</label>
            <input value ={email} onChange={ (e) => setEmail(e.target.value) } type = "email" placeholder = "enter email" name = "email"></input><br />
            <label htmlFor="password">Password</label>
            <input value ={password} onChange={ (e) => setPassword(e.target.value) } type = "text" placeholder = "enter password" name = "password"></input><br /> 
            <button type = "submit" >Sign In</button><br />
            </form>
            <button className="link-button" onClick={() => probs.onformSwitch('register')}>Do not have an accout? Register Here</button>
        </div>
    )
    
}