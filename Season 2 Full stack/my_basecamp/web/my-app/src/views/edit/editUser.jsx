import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateEditFormUser from "../../components/CreateEditUserForm";
import { getUser } from "../../services/users";

export default function EditUser(props) {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const { id } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
    const user = getUser(id).then((user) => {
      console.log("user: ", user);
      setForm(user);
    });
  }, [id]);
 
  return (
    <div className="auth">
      <CreateEditFormUser
        title={"edit"}
        type="edit"
        form={form}
        setForm={setForm}
      />
      <Link className="link-button" to="/users">
        Go back to list
      </Link>
    </div>
  );
}
