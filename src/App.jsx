import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Overview from "./pages/Overview";
import Achievements from "./pages/Achievements";
import Assignments from "./pages/Assignments";
import Subjects from "./pages/Subjects";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import SubjectDetail from "./pages/SubjectDetail";
import AssignmentDetail from "./pages/AssignmentDetail";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="dashboard-container">
        <Sidebar open={sidebarOpen} />
        <main
          className={`main-content ${!sidebarOpen ? "sidebar-closed" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subject/:id" element={<SubjectDetail />} />
            <Route path="/assignment/:id" element={<AssignmentDetail />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
