import { Routes, Route } from "react-router-dom";

import IndexPage from "../views/index";
export default function Router(){
    return(
        <>
            <Routes>
                <Route path="/index" element={<IndexPage />} />
            </Routes>
        </>
        
    );
}