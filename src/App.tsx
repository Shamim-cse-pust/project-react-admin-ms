import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";
import UserCreate from "./secure/users/UserCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RedirectToDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/create" element={<UserCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
