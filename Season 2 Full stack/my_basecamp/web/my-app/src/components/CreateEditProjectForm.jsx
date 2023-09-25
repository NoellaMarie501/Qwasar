import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, updateProject } from "../services/project";
import { getLoggedInUser } from "../utils/getLoggedInUser";
import { handleChange } from "../utils/handleChange";
import { useProjectsContext } from "../context/projects/projectsContext";

const CreateEditFormProject = ({ title, type, form, setForm, project_id }) => {
  const decode = getLoggedInUser();
  const navigate = useNavigate();
  const [created, setIsCreated] = useState(false);
  const { getProjects } = useProjectsContext()

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("from frontend",form.email);
    // console.log(form.password);
    if (type === "createProject") {
      form.UserId = decode.id;
      //console.log("name, description", form.name, form.description);
      console.log("form.UserId",form.UserId)
      createProject({ ...form }).then((response) => {
        if (response) {
          getProjects();
        }
      });
    } else if (type === "editProject") {
      updateProject(project_id, { ...form }).then((response) => {
        if (response.toString().includes("successfully")) {
          getProjects();
        }
      });
    }
    setIsCreated("Saved Successfully!!");
    navigate("/index")
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
