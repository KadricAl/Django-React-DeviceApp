import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';
import AddService from './pages/AddService';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetail />} />
            <Route path="/devices/:id/add-service" element={<AddService />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
