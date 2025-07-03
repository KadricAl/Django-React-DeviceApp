import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function ServiceHistory() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  // Load latest 50 services
  useEffect(() => {
    fetch('http://localhost:8000/api/services/?ordering=-end_date&page_size=50')
      .then(res => res.json())
      .then(data => {
        const list = data.results || data;
        setServices(list);
        setFilteredServices(list);
      });
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredServices(services);
      return;
    }
    const keyword = search.toLowerCase();
    const filtered = services.filter(s =>
      s.installed_device?.serial_number?.toLowerCase().includes(keyword)
    );
    setFilteredServices(filtered);
  };

  const handleDelete = id => {
    fetch(`http://localhost:8000/api/services/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setFilteredServices(prev => prev.filter(s => s.id !== id));
        setServices(prev => prev.filter(s => s.id !== id));
        setSelectedToDelete(null);
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete service.');
      });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Service History</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by serial number..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Type</th>
            <th className="border p-2">Installed Device</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No services found.
              </td>
            </tr>
          ) : (
            filteredServices.map(service => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="border p-2">{service.type}</td>
                <td className="border p-2">{service.installed_device?.serial_number || 'N/A'}</td>
                <td className="border p-2">{new Date(service.start_date).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(service.end_date).toLocaleDateString()}</td>
                <td className="border p-2">${parseFloat(service.price).toFixed(2)}</td>
                <td className="border p-2">{service.description}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/services/${service.id}/edit`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedToDelete(service.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={selectedToDelete !== null}
        title="Confirm Deletion"
        message="Are you sure you want to delete this service?"
        onConfirm={() => handleDelete(selectedToDelete)}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
