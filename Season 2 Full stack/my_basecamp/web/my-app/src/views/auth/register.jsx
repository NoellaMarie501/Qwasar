import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateEditFormUser from "../../components/CreateEditUserForm";
import { getCookie } from "../../utils/getCookie";

export default function Register(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  //getting cookie if user authenticated
  const cookie = getCookie();
  //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="auth">
      <CreateEditFormUser
        title={"register"}
        type="register"
        form={form}
        setForm={setForm}
      />
      {/*what to display if user authenticated or not*/}
      {!cookie ? (
        <>
          <Link className="link-button" to="/signin">
            Already have an accout? Sign In
          </Link>
        </>
      ) : (
        <Link className="link-button" to="/users">
          Go back to list
        </Link>
      )}
    </div>
  );
}
