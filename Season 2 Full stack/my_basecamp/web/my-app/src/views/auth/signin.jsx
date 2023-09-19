import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { login } from "../../services/users";

import { handleChange } from "../../utils/handleChange";

//import { BrowserRouter as Routers, Route, Redirect } from 'react-router-dom';
//import Routers from "../../routes/router";


export default function SignIn(){
    const navigate = useNavigate();
    const [form, setForm]  = useState({email: '', password: ''});
    //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit =  (e) => {
         e.preventDefault();
        // console.log(form.email);
        // console.log(form.password);
        login({...form, navigate});
    }

    return (
        <div className="auth">
            <form onSubmit={handleSubmit} className="signin-form">
            <h1>Sign In</h1> <br />
            <label htmlFor="email">Email</label>
            <input value ={form.email} onChange={ (e) => handleChange(e,setForm,form)} type = "email" placeholder = "enter email" name = "email"></input><br />
            <label htmlFor="password">Password</label>
            <input value ={form.password} onChange={(e) => handleChange(e,setForm,form)} type = "text" placeholder = "enter password" name = "password"></input><br /> 
            <button type = "submit" >Sign In</button><br />
            </form>
            {/* <button className="link-button" onClick={() => probs.onformSwitch('register')}>Do not have an accout? Register Here</button> */}
            <Link className="link-button" to='/register' >Do not have an accout? Register Here</Link>
        
        </div>
    )
    
}