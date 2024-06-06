import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import AddRecipe from "./components/AddRecipe";
import Login from "./components/Login";
import Recipe from "./components/Recipe";

function App() {
    const user = localStorage.getItem("token");
    return (
        <Routes>
            {user && <Route path="/" element={<Main />} />}
            {user && <Route path="/addrecipe" element={<AddRecipe/>} />}
            {user && <Route path="/recipes/:id" element={<Recipe />} />}
            {user && <Route path="/recipes/:id/edit" element={<AddRecipe />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/addrecipe" element={<Navigate replace to="/login" />} />
            <Route path="/recipes/:id" element={<Navigate replace to="/login" />} />
            <Route path="/recipes/:id/edit" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;
