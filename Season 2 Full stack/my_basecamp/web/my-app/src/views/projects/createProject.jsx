import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateEditFormProject from "../../components/CreateEditProjectForm";

export default function CreateProject(props) {
  const [form, setForm] = useState({
    name : "",
    description: "",
  });



  //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="forms">
        
      <CreateEditFormProject
        title={"createProject"}
        type="createProject"
        form={form}
        setForm={setForm}
      />
        <Link className="link-button" to="/index">
          Go back to Project list
        </Link>
     
    </div>
  );
}
