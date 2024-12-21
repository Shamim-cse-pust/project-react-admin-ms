import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./secure/Dashboard";
import Users from "./secure/Users";
import Menu from "./secure/components/Menu";
import Nav from "./secure/components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
