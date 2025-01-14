import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
