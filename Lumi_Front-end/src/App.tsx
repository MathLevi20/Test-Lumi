// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InvoiceLibrary from './pages/InvoiceLibrary';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoiceLibrary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
