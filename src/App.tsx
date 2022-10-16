import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./App.css";

// components
import { NavBar } from "./components/NavBar/NavBar";
import { Main } from "./pages/Main/Main";
import { TaskII } from "./pages/TaskII/TaskII";

// hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/task-2" element={<TaskII />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
