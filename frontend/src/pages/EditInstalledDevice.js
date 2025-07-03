import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditInstalledDevice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serial_number: '',
    installation_date: '',
    device_id: '',
    customer_id: ''
  });

  const [devices, setDevices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch installed device + choices
  useEffect(() => {
    // Fetch device options
    fetch('http://localhost:8000/api/devices/')
      .then(res => res.json())
      .then(data => setDevices(data));

    // Fetch customer options
    fetch('http://localhost:8000/api/customers/')
      .then(res => res.json())
      .then(data => setCustomers(data));

    // Fetch current installed device
    fetch(`http://localhost:8000/api/installed-devices/${id}/`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          serial_number: data.serial_number,
          installation_date: data.installation_date,
          device_id: data.device?.id || data.device,      // handles nested or plain
          customer_id: data.customer?.id || data.customer
        });
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/installed-devices/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serial_number: formData.serial_number,
        installation_date: formData.installation_date,
        device_id: formData.device_id,
        customer_id: formData.customer_id
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        navigate(`/installed-devices/${id}`);
      })
      .catch(err => {
        console.error('Edit failed:', err);
        alert('Failed to update installed device.');
      });
  };

  if (loading) return <p>Loading installed device...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Edit Installed Device</h2>
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
            name="device_id"
            value={formData.device_id}
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
            name="customer_id"
            value={formData.customer_id}
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
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate(`/installed-devices/${id}`)}
            className="ml-4 text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
