import React from "react";
import { register, updateUser } from "../services/users";
import { handleChange } from "../utils/handleChange";
import { useState } from "react";
import { ROLES } from "../constants/config";
import { getCookie } from "../utils/getCookie";

const CreateEditFormUser = ({ title, type, form, setForm, user_id }) => {
const cookie = getCookie('token');
//console.log("cookie", cookie.length);
//console.log("type",type)
  const [created, setIsCreated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("from frontend",form.email);
    // console.log(form.password);
    if (type === "Register User") {
      //console.log("username, firstname, lastname, email", form.username, form.firstname, form.lastname, form.email)
      register({ ...form });
    } else if (type === "edit") {
      updateUser(user_id, { ...form });
      
    }
    setIsCreated("Saved Successfully!!");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        {created && <p>{created}</p>}
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
        {type === "register" && (
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
        {((type === "register" && cookie) ||
          (type === "edit")) && (
            
            <>
              <label htmlFor="role">Role: </label>
              <select
                value={form.role}
                onChange={(e) => handleChange(e, setForm, form)}
                type="text"
                name="role"
                required
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
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

export default CreateEditFormUser;
