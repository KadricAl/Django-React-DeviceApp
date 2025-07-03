import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SERVICE_TYPES = [
  { value: 'request', label: 'Request' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'none', label: 'None' },
];

export default function AddService() {
  const { id } = useParams(); // installed_device id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    start_date: '',
    end_date: '',
    description: '',
    price: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
        type: formData.type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        installed_device_id: id,
    };

    fetch('http://localhost:8000/api/services/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add service');
        navigate(`/installed-devices/${id}`);
      })
      .catch(err => {
        console.error('Add service error:', err);
        alert('Failed to add service.');
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <div>
          <label className="block font-semibold">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Type --</option>
            {SERVICE_TYPES.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold">Price:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Add Service
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


