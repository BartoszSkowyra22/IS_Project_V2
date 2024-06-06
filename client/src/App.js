import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import AddFlight from "./components/AddFlight";
import Login from "./components/Login";
import Flight from "./components/Flight";

function App() {
    const user = localStorage.getItem("token");
    return (
        <Routes>
            {user && <Route path="/" element={<Main />} />}
            {user && <Route path="/addflight" element={<AddFlight/>} />}
            {user && <Route path="/flights/:id" element={<Flight />} />}
            {user && <Route path="/flights/:id/edit" element={<AddFlight />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/addflight" element={<Navigate replace to="/login" />} />
            <Route path="/flights/:id" element={<Navigate replace to="/login" />} />
            <Route path="/flights/:id/edit" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;


// import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
// import Signup from "./components/Signup";
// import AddFlight from "./components/AddFlight";
// import Login from "./components/Login";
// import Flight from "./components/Flight";
//
// function App() {
//     const user = localStorage.getItem("token");
//     return (
//         <Routes>
//             {user && <Route path="/" element={<Main />} />}
//             {/*{user && <Route path="/addrecipe" element={<AddFlight/>} />}*/}
//             {user && <Route path="/flights/:id" element={<Flight />} />}
//             {/*{user && <Route path="/recipes/:id/edit" element={<AddFlight />} />}*/}
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<Navigate replace to="/login" />} />
//             {/*<Route path="/addrecipe" element={<Navigate replace to="/login" />} />*/}
//             <Route path="/flights/:id" element={<Navigate replace to="/login" />} />
//             {/*<Route path="/recipes/:id/edit" element={<Navigate replace to="/login" />} />*/}
//         </Routes>
//     );
// }
//
// export default App;
