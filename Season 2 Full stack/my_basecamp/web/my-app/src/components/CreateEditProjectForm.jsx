import React from "react";
import { handleChange } from "../utils/handleChange";


const CreateEditFormProject = ({ title, type, form ,setForm, user_id }) => {
   

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("from frontend",form.email);
        // console.log(form.password);
        if( type === 'register'){
          console.log("name, description", form.name, form.description)
             register({ ...form });
        }
        else if( type === 'edit'){
          
            updateUser(user_id,{ ...form });
        }
       
        
      };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <h1>{title}</h1>
        <br />
        <label htmlFor="username">Username: </label>
        <input
          value={form.username}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter user name"
          name="username"
        ></input>
        <br />
        {(type === "register") && (
          <>
            <label htmlFor="password">Password: </label>
            <input
              value={form.password}
              onChange={(e) => handleChange(e, setForm, form)}
              type="text"
              placeholder="enter password"
              name="password"
              required
            ></input>
          </>
        )}
        <br />
        <label htmlFor="firstname">First Name: </label>
        <input
          value={form.firstname}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter first name"
          name="firstname"
          required
        ></input>
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input
          value={form.lastname}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter last name"
          name="lastname"
          required
        ></input>
        <br />
        <label htmlFor="email">Email: </label>
        <input
          value={form.email}
          onChange={(e) => handleChange(e, setForm, form)}
          type="email"
          placeholder="enter email"
          name="email"
          required
        ></input>
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
    </>
  );
};

export default CreateEditFormProject;
