import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Connexion from './pages/Connexion';
import Dashboard from './pages/dashboard';
import ModuleDetail from './pages/module';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/modules/:moduleId" element={<ModuleDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
