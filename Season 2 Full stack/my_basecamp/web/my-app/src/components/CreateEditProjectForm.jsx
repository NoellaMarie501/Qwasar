import React from "react";
import { handleChange } from "../utils/handleChange";
import { createProject, updateProject } from "../services/project";
import { useState } from "react";

const CreateEditFormProject = ({ title, type, form, setForm, project_id }) => {
  const [created, setIsCreated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("from frontend",form.email);
    // console.log(form.password);
    if (type === "createProject") {
      //console.log("name, description", form.name, form.description);
      createProject({ ...form });
    } else if (type === "editProject") {
      updateProject(project_id, { ...form });
    }
    setIsCreated("Saved Successfully!!");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
      {created && <p>{created}</p>}
        <h1>{title}</h1>
        <br />
        <label htmlFor="name">Project Name: </label>
        <input
          value={form.name}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter project name"
          name="name"
        ></input>
        <br />
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          rows="4"
          cols="50"
          required
          value={form.description}
          onChange={(e) => handleChange(e, setForm, form)}
          placeholder="enter project description"
        >
        </textarea>
        <br />
        <button type="submit">Create</button>
        <br />
      </form>
    </>
  );
};

export default CreateEditFormProject;
