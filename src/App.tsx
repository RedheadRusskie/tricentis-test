import React from "react";
import "./App.css";

// components
import { NavBar } from "./components/NavBar/NavBar";
import { Main } from "./Pages/Main/Main";
import { TaskII } from "./Pages/TaskII/TaskII";

// hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/task-2" element={<TaskII />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
