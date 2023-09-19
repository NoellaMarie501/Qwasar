import { Routes, Route } from "react-router-dom";

import IndexPage from "../views/index";
import UserPage from "../views/index/users";
import SignIn from "../views/auth/signin";
import Register from "../views/auth/register";
import { useEffect } from "react";
import EditUser from "../views/edit/editUser";

export default function Routers(){
   
    return(
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/index" element={<IndexPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/:id" element={<EditUser />} />
            </Routes>
        </>
        
    );
}