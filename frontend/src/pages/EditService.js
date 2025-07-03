import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SERVICE_TYPES = [
  { value: 'request', label: 'Request' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'none', label: 'None' }
];

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    start_date: '',
    end_date: '',
    description: '',
    price: '',
  });

  const [installedDeviceId, setInstalledDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/services/${id}/`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          type: data.type,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
          price: data.price
        });
        setInstalledDeviceId(data.installed_device?.id || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading service:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      installed_device_id: installedDeviceId,
    };

    fetch(`http://localhost:8000/api/services/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => {
        navigate('/services');
      })
      .catch(err => {
        console.error('Failed to update service:', err);
        alert('Failed to update service.');
      });
  };

  if (loading) return <p>Loading service...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Edit Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Service Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Type --</option>
            {SERVICE_TYPES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
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
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Price ($):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="ml-4 text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
