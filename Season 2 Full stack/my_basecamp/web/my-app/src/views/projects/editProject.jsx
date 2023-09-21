import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateEditFormProject from "../../components/CreateEditProjectForm";
import { getProject } from "../../services/project";

export default function EditProject(props) {
  //form that will hold fields with setter
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  //getting id from parameters
  const { id } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
    const project = getProject(id).then((project) => {
      console.log("user: ", project);
      setForm(project);
    });
  }, [id]);
 
  return (
    <div className="forms">
      <CreateEditFormProject
        title={"editProject"}
        type="editProject"
        form={form}
        setForm={setForm}
        user_id={id}
      />
      <Link className="link-button" to="/index">
        Go back to Project list
      </Link>
    </div>
  );
}
