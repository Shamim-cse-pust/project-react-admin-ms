import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./secure/Dashboard";
import Users from "./secure/Users";
import Login from "./public/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
