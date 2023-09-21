import { Route, Routes } from "react-router-dom";

import Register from "../views/auth/register";
import SignIn from "../views/auth/signin";
import CreateProject from "../views/projects/createProject";
import EditProject from "../views/projects/editProject";
import IndexPage from "../views/projects/index";
import EditUser from "../views/users/editUser";
import UserPage from "../views/users/users";

export default function Routers(){
   
    return(
        <>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<SignIn />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/:id" element={<EditUser />} />
                {/* Project Routes */}
                <Route path="/index" element={<IndexPage />} />
                <Route path="/createProject" element={<CreateProject />} />
                <Route path="/projects/:id" element={<EditProject />} />
            </Routes>
        </>
        
    );
}