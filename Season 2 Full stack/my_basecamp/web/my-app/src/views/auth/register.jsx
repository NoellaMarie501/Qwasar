import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/users";
import { handleChange } from "../../utils/handleChange";
import CreateEditFormUser from "../../components/CreateEditUserForm";

export default function Register(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="auth">
      <CreateEditFormUser
        title={"register"}
        type="register"
        form={form}
        setForm={setForm}
      />
      <Link className="link-button" to="/signin">
        Already have an accout? Sign In
      </Link>
    </div>
  );
}
