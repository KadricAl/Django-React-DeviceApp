import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';
import AddService from './pages/AddService';
import EditDevice from './pages/EditDevice';
import AddDevice from './pages/AddDevice';
import Customers from './pages/Customers';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';
import InstalledDevices from './pages/InstalledDevices';
import AddInstalledDevice from './pages/AddInstalledDevice';
import InstalledDeviceDetail from './pages/InstalledDeviceDetail';
import EditInstalledDevice from './pages/EditInstalledDevice';

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
            <Route path="/devices/:id/edit" element={<EditDevice />} />
            <Route path="/devices/new" element={<AddDevice />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/new" element={<AddCustomer />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            <Route path="/installed-devices" element={<InstalledDevices />} />
            <Route path="/installed-devices/new" element={<AddInstalledDevice />} />
            <Route path="/installed-devices/:id" element={<InstalledDeviceDetail />} />
            <Route path="/installed-devices/:id/add-service" element={<AddService />} />
            <Route path="/installed-devices/:id/edit" element={<EditInstalledDevice />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
