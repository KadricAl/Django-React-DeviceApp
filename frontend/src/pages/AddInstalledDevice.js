import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddInstalledDevice() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serial_number: '',
    installation_date: '',
    device: '',
    customer: ''
  });

  const [devices, setDevices] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch devices
    fetch('http://localhost:8000/api/devices/')
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error('Error fetching devices:', err));

    // Fetch customers
    fetch('http://localhost:8000/api/customers/')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:8000/api/installed-devices/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create installed device');
        navigate('/installed-devices');
      })
      .catch(err => {
        console.error("Creation error:", err);
        alert("Failed to create installed device.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Add Installed Device</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <div>
          <label className="block font-semibold">Serial Number:</label>
          <input
            type="text"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Installation Date:</label>
          <input
            type="date"
            name="installation_date"
            value={formData.installation_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Device:</label>
          <select
            name="device"
            value={formData.device}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Device --</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.name} ({device.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Customer:</label>
          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Customer --</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Install Device
          </button>
          <button
            type="button"
            onClick={() => navigate('/installed-devices')}
            className="ml-4 text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
